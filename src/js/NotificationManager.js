import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { 
  getFirestore, collection, getDocs, doc, getDoc, addDoc, setDoc, serverTimestamp 
} from 'firebase/firestore';
import { useNotifications } from './Notifications';

// Create a singleton instance
let instance = null;
let initialized = false;
let checkInterval = null;

export function initialiseNotifications() {
  // Only initialize once
  if (initialized) {
    return instance;
  }
  
  const auth = getAuth();
  const db = getFirestore();
  const { isSupported, showNotification } = useNotifications();
  
  // Create the instance
  instance = {
    // Check notifications - safe to call from anywhere
    checkNotifications: async () => {
      const user = auth.currentUser;
      if (!user) return;
      
      console.log("Checking for plant notifications...");
      
      try {
        // Fetch plants that need watering
        const plantsRef = collection(db, `userData/${user.uid}/plants`);
        const now = new Date();
        
        // Get all plants
        const plantsSnapshot = await getDocs(plantsRef);
        const plants = plantsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        
        // Get already notified plants
        const prefsRef = doc(db, `userData/${user.uid}/userPreferences/notifications`);
        const prefsSnapshot = await getDoc(prefsRef);
        const notifiedPlants = new Set(
          prefsSnapshot.exists() && prefsSnapshot.data().notifiedPlants 
            ? prefsSnapshot.data().notifiedPlants 
            : []
        );
        
        // Check water needs
        const plantsNeedingWater = plants.filter(plant => {
          if (!plant.lastWatered || !plant.waterFrequency) return false;
          
          const lastWatered = plant.lastWatered.toDate ? plant.lastWatered.toDate() : new Date(plant.lastWatered);
          const daysSinceWatering = Math.floor((now - lastWatered) / (1000 * 60 * 60 * 24));
          
          return daysSinceWatering >= plant.waterFrequency && !notifiedPlants.has(`water-${plant.id}`);
        });
        
        // Check fertiliser needs
        const plantsNeedingFertiliser = plants.filter(plant => {
          if (!plant.lastFertilised || !plant.fertiliseFrequency) return false;
          
          const lastFertilised = plant.lastFertilised.toDate ? plant.lastFertilised.toDate() : new Date(plant.lastFertilised);
          const daysSinceFertilising = Math.floor((now - lastFertilised) / (1000 * 60 * 60 * 24));
          
          return daysSinceFertilising >= plant.fertiliseFrequency && !notifiedPlants.has(`fertiliser-${plant.id}`);
        });
        
        // Process water notifications
        for (const plant of plantsNeedingWater) {
          // Send notification
          if (isSupported.value) {
            await showNotification(`${plant.name} needs water!`, {
              body: `Your ${plant.name} should be watered today.`,
              icon: '/favicon.ico',
              requireInteraction: true,
              data: {
                plantId: plant.id,
                type: 'water'
              }
            });
          }
          
          // Store in Firestore
          await addDoc(collection(db, `userData/${user.uid}/notifications`), {
            title: "Plant needs water!",
            body: `${plant.name} needs watering.`,
            type: "water",
            plantId: plant.id,
            plantName: plant.name,
            read: false,
            createdAt: serverTimestamp()
          });
          
          // Mark as notified
          notifiedPlants.add(`water-${plant.id}`);
        }
        
        // Process fertiliser notifications
        for (const plant of plantsNeedingFertiliser) {
          // Send notification
          if (isSupported.value) {
            await showNotification(`${plant.name} needs fertiliser!`, {
              body: `Your ${plant.name} should be fertilised today.`,
              icon: '/favicon.ico',
              requireInteraction: true,
              data: {
                plantId: plant.id,
                type: 'fertiliser'
              }
            });
          }
          
          // Store in Firestore
          await addDoc(collection(db, `userData/${user.uid}/notifications`), {
            title: "Plant needs fertiliser!",
            body: `${plant.name} needs fertilising.`,
            type: "fertiliser",
            plantId: plant.id,
            plantName: plant.name,
            read: false,
            createdAt: serverTimestamp()
          });
          
          // Mark as notified
          notifiedPlants.add(`fertiliser-${plant.id}`);
        }
        
        // Save notified plants
        if (plantsNeedingWater.length > 0 || plantsNeedingFertiliser.length > 0) {
          await setDoc(prefsRef, {
            notifiedPlants: Array.from(notifiedPlants),
            updatedAt: serverTimestamp()
          }, { merge: true });
        }
        
      } catch (error) {
        console.error("Error checking plant notifications:", error);
      }
    }
  };
  
  // Set up auth state listener for automatic checks
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User logged in, start checking
      if (!checkInterval) {
        // Do an initial check
        instance.checkNotifications();
        
        // Set up periodic checks
        checkInterval = setInterval(() => {
          instance.checkNotifications();
        }, 30 * 60 * 1000); // Every 30 minutes
      }
    } else {
      // User logged out, stop checking
      if (checkInterval) {
        clearInterval(checkInterval);
        checkInterval = null;
      }
    }
  });
  
  initialized = true;
  return instance;
}