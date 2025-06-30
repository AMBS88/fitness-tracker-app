import React, { useState, useEffect } from 'react';
import { Calendar, Target, TrendingDown, Activity, Camera, Utensils, Clock, Trophy, AlertTriangle, Plus, Trash2, ShoppingCart, ChefHat, BarChart3, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const FitnessTracker = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Enhanced user data with historical tracking
  const [userData, setUserData] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fitnessUserData');
      if (saved) return JSON.parse(saved);
    }
    return {
      startWeight: 106,
      currentWeight: 106,
      targetWeight: 97,
      startWaist: 95,
      currentWaist: 95,
      targetWaist: 85,
      startDate: new Date().toISOString().split('T')[0],
      currentPhase: 1,
      weekNumber: 1,
      dailyCalories: 2100,
      dailyProtein: 160,
      dailyCarbs: 215,
      dailyFat: 60,
      lastCalorieAdjustment: null,
      plateauAlert: false
    };
  });

  // Historical data for charts - starts empty
  const [historicalData, setHistoricalData] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fitnessHistoricalData');
      if (saved) return JSON.parse(saved);
    }
    return [];
  });

  // Progress photos with comparison - starts empty
  const [progressPhotos, setProgressPhotos] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fitnessProgressPhotos');
      if (saved) return JSON.parse(saved);
    }
    return [];
  });

  // Recipe database
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      name: "Protein Veggie Omelette",
      category: "breakfast",
      servings: 1,
      prepTime: 10,
      calories: 420,
      protein: 28,
      carbs: 8,
      fat: 16,
      ingredients: [
        { item: "Eggs", amount: 3, unit: "large" },
        { item: "Bell peppers", amount: 50, unit: "g" },
        { item: "Spinach", amount: 30, unit: "g" },
        { item: "Onion", amount: 30, unit: "g" },
        { item: "Olive oil", amount: 1, unit: "tsp" }
      ],
      instructions: "1. Heat oil in pan\n2. Sauté vegetables\n3. Beat eggs and pour over veggies\n4. Fold and serve"
    },
    {
      id: 2,
      name: "Grilled Chicken Power Bowl",
      category: "lunch",
      servings: 1,
      prepTime: 20,
      calories: 580,
      protein: 52,
      carbs: 45,
      fat: 12,
      ingredients: [
        { item: "Chicken breast", amount: 180, unit: "g" },
        { item: "Quinoa", amount: 80, unit: "g dry" },
        { item: "Mixed vegetables", amount: 150, unit: "g" },
        { item: "Olive oil", amount: 1, unit: "tbsp" },
        { item: "Lemon", amount: 0.5, unit: "whole" }
      ],
      instructions: "1. Season and grill chicken\n2. Cook quinoa\n3. Steam vegetables\n4. Combine with lemon dressing"
    },
    {
      id: 3,
      name: "Cottage Cheese Veggie Bowl",
      category: "dinner",
      servings: 1,
      prepTime: 5,
      calories: 380,
      protein: 35,
      carbs: 18,
      fat: 18,
      ingredients: [
        { item: "Cottage cheese", amount: 150, unit: "g" },
        { item: "Cherry tomatoes", amount: 100, unit: "g" },
        { item: "Cucumber", amount: 80, unit: "g" },
        { item: "Avocado", amount: 30, unit: "g" },
        { item: "Black pepper", amount: 1, unit: "pinch" }
      ],
      instructions: "1. Chop all vegetables\n2. Mix with cottage cheese\n3. Season and serve"
    },
    {
      id: 4,
      name: "Greek Yogurt Protein Parfait",
      category: "snacks",
      servings: 1,
      prepTime: 3,
      calories: 280,
      protein: 25,
      carbs: 35,
      fat: 4,
      ingredients: [
        { item: "Greek yogurt", amount: 150, unit: "g" },
        { item: "Mixed berries", amount: 80, unit: "g" },
        { item: "Protein powder", amount: 15, unit: "g" },
        { item: "Cinnamon", amount: 1, unit: "pinch" }
      ],
      instructions: "1. Mix protein powder with yogurt\n2. Layer with berries\n3. Sprinkle cinnamon"
    }
  ]);

  // Meal planning - with persistence
  const [weeklyMealPlan, setWeeklyMealPlan] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fitnessWeeklyMealPlan');
      if (saved) return JSON.parse(saved);
    }
    return {};
  });
  
  const [shoppingList, setShoppingList] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fitnessShoppingList');
      if (saved) return JSON.parse(saved);
    }
    return [];
  });

  // Enhanced daily log - with persistence
  const [dailyLog, setDailyLog] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fitnessDailyLog');
      if (saved) return JSON.parse(saved);
    }
    return {
      weight: '',
      waist: '',
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      steps: 0,
      workoutCompleted: false,
      workoutType: '',
      mood: 5,
      sleep: 7,
      notes: ''
    };
  });

  // Save data to localStorage whenever state changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('fitnessUserData', JSON.stringify(userData));
    }
  }, [userData]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('fitnessHistoricalData', JSON.stringify(historicalData));
    }
  }, [historicalData]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('fitnessProgressPhotos', JSON.stringify(progressPhotos));
    }
  }, [progressPhotos]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('fitnessWeeklyMealPlan', JSON.stringify(weeklyMealPlan));
    }
  }, [weeklyMealPlan]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('fitnessShoppingList', JSON.stringify(shoppingList));
    }
  }, [shoppingList]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('fitnessDailyLog', JSON.stringify(dailyLog));
    }
  }, [dailyLog]);

  // Smart Automation Functions
  const detectPlateau = () => {
    if (historicalData.length < 21) return { hasPlateau: false, message: '' };
    
    const last21Days = historicalData.slice(-21);
    const weights = last21Days.map(d => d.weight).filter(w => w > 0);
    
    if (weights.length < 15) return { hasPlateau: false, message: '' };
    
    const firstWeek = weights.slice(0, 7);
    const lastWeek = weights.slice(-7);
    const avgFirst = firstWeek.reduce((a, b) => a + b, 0) / firstWeek.length;
    const avgLast = lastWeek.reduce((a, b) => a + b, 0) / lastWeek.length;
    const weightChange = Math.abs(avgFirst - avgLast);
    
    if (weightChange < 0.3) {
      return {
        hasPlateau: true,
        message: 'No significant weight loss in 3 weeks. Consider reducing calories by 150 or adding extra cardio session.'
      };
    }
    return { hasPlateau: false, message: '' };
  };

  const autoAdjustCalories = () => {
    if (historicalData.length < 14) return null;
    
    const last14Days = historicalData.slice(-14);
    const weights = last14Days.map(d => d.weight).filter(w => w > 0);
    
    if (weights.length < 10) return null;
    
    const weeklyLoss = (weights[0] - weights[weights.length - 1]) / 2; // 2 weeks
    const today = new Date().toISOString().split('T')[0];
    
    // Don't adjust if already adjusted this week
    if (userData.lastCalorieAdjustment && 
        new Date(today) - new Date(userData.lastCalorieAdjustment) < 7 * 24 * 60 * 60 * 1000) {
      return null;
    }
    
    if (weeklyLoss > 1.2) {
      // Losing too fast, increase calories
      return {
        adjustment: 150,
        reason: 'Weight loss too rapid (>1.2kg/week). Increasing calories by 150.',
        newCalories: userData.dailyCalories + 150
      };
    } else if (weeklyLoss < 0.4) {
      // Losing too slow, decrease calories
      return {
        adjustment: -150,
        reason: 'Weight loss too slow (<0.4kg/week). Reducing calories by 150.',
        newCalories: userData.dailyCalories - 150
      };
    }
    
    return null;
  };

  const generateWeeklyPlan = () => {
    const currentPhase = userData.currentPhase;
    const weekNumber = userData.weekNumber;
    
    // Generate meal plan
    const mealSuggestions = {
      Monday: { breakfast: 1, lunch: 2, dinner: 3, snacks: 4 },
      Tuesday: { breakfast: 1, lunch: 2, dinner: 3, snacks: 4 },
      Wednesday: { breakfast: 1, lunch: 2, dinner: 3, snacks: 4 },
      Thursday: { breakfast: 1, lunch: 2, dinner: 3, snacks: 4 },
      Friday: { breakfast: 1, lunch: 2, dinner: 3, snacks: 4 },
      Saturday: { breakfast: 1, lunch: 2, dinner: 3, snacks: 4 },
      Sunday: { breakfast: 1, lunch: 2, dinner: 3, snacks: 4 }
    };
    
    // Generate workout plan based on phase
    const workoutSuggestions = {
      Monday: currentPhase === 1 ? 'Strength A - Full Body Machines' : 
              currentPhase === 2 ? 'Upper Body Strength' : 'Push Workout',
      Tuesday: currentPhase === 1 ? 'Cardio - Bike 45min Zone 2' : 
               currentPhase === 2 ? 'Cardio - Walk/Run Intervals' : 'Easy Run 30min',
      Wednesday: currentPhase === 1 ? 'Strength B - Full Body Machines' : 
                 currentPhase === 2 ? 'Lower Body Strength' : 'Pull Workout',
      Thursday: currentPhase === 1 ? 'Cardio - Swimming 45min' : 
                currentPhase === 2 ? 'Cardio - Low Impact' : 'Tempo Run 25min',
      Friday: currentPhase === 1 ? 'Strength A - Full Body Machines' : 
              currentPhase === 2 ? 'Upper Body Strength' : 'Legs Workout',
      Saturday: currentPhase === 1 ? 'Cardio - Elliptical 45min' : 
                currentPhase === 2 ? 'Cardio - Walk/Run Intervals' : 'HIIT Bike 20min',
      Sunday: 'Rest Day - Gentle Yoga/Mobility'
    };
    
    return { mealSuggestions, workoutSuggestions };
  };

  // Auto-calculate current phase and week
  useEffect(() => {
    const startDate = new Date(userData.startDate);
    const today = new Date();
    const daysDiff = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    const weekNumber = Math.floor(daysDiff / 7) + 1;
    
    let phase = 1;
    if (weekNumber > 8) phase = 3;
    else if (weekNumber > 4) phase = 2;
    
    setUserData(prev => ({ ...prev, weekNumber, currentPhase: phase }));
    
    // Run smart automation checks
    const plateauCheck = detectPlateau();
    const calorieAdjustment = autoAdjustCalories();
    
    if (plateauCheck.hasPlateau && !userData.plateauAlert) {
      setUserData(prev => ({ ...prev, plateauAlert: true }));
    }
    
    if (calorieAdjustment) {
      setUserData(prev => ({
        ...prev,
        dailyCalories: calorieAdjustment.newCalories,
        lastCalorieAdjustment: new Date().toISOString().split('T')[0]
      }));
    }
  }, [userData.startDate, historicalData]);

  // Photo management with persistence
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Photo too large. Please choose a file under 5MB.');
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPhoto = {
          id: Date.now(),
          date: currentDate.toISOString().split('T')[0],
          week: userData.weekNumber,
          url: e.target.result, // Base64 encoded image
          notes: '',
          fileName: file.name,
          fileSize: Math.round(file.size / 1024) // Size in KB
        };
        setProgressPhotos(prev => [...prev, newPhoto]);
      };
      reader.readAsDataURL(file);
      
      // Reset the input
      event.target.value = '';
    }
  };

  // Delete photo function
  const deletePhoto = (photoId) => {
    setProgressPhotos(prev => prev.filter(photo => photo.id !== photoId));
  };

  // Meal planning functions
  const addToMealPlan = (day, mealType, recipeId) => {
    setWeeklyMealPlan(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [mealType]: recipeId
      }
    }));
  };

  const generateShoppingList = () => {
    const ingredients = {};
    
    Object.entries(weeklyMealPlan).forEach(([day, meals]) => {
      Object.entries(meals).forEach(([mealType, recipeId]) => {
        const recipe = recipes.find(r => r.id === recipeId);
        if (recipe) {
          recipe.ingredients.forEach(ingredient => {
            const key = ingredient.item;
            if (ingredients[key]) {
              ingredients[key].amount += ingredient.amount;
            } else {
              ingredients[key] = { ...ingredient };
            }
          });
        }
      });
    });

    setShoppingList(Object.values(ingredients));
  };

  // Save daily data to historical tracking
  const saveDailyData = () => {
    if (!dailyLog.weight || !dailyLog.waist) {
      alert('Please enter both weight and waist measurements to save.');
      return;
    }
    
    const newEntry = {
      date: currentDate.toISOString().split('T')[0],
      weight: parseFloat(dailyLog.weight),
      waist: parseFloat(dailyLog.waist),
      week: userData.weekNumber,
      calories: dailyLog.calories,
      sleep: dailyLog.sleep,
      mood: dailyLog.mood
    };
    
    setHistoricalData(prev => {
      const existing = prev.findIndex(entry => entry.date === newEntry.date);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = newEntry;
        return updated;
      }
      return [...prev, newEntry].sort((a, b) => new Date(a.date) - new Date(b.date));
    });

    // Update current weight/waist in userData
    setUserData(prev => ({
      ...prev,
      currentWeight: parseFloat(dailyLog.weight),
      currentWaist: parseFloat(dailyLog.waist)
    }));
    
    alert('✅ Data saved successfully!');
  };

  // Clear all data function (for testing/reset)
  const clearAllData = () => {
    if (window.confirm('⚠️ This will delete ALL your data. Are you sure?')) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('fitnessUserData');
        localStorage.removeItem('fitnessHistoricalData');
        localStorage.removeItem('fitnessProgressPhotos');
        localStorage.removeItem('fitnessWeeklyMealPlan');
        localStorage.removeItem('fitnessShoppingList');
        localStorage.removeItem('fitnessDailyLog');
      }
      window.location.reload();
    }
  };

  const calculateProgress = () => {
    const weightLoss = userData.startWeight - userData.currentWeight;
    const waistReduction = userData.startWaist - userData.currentWaist;
    const weightProgress = (weightLoss / (userData.startWeight - userData.targetWeight)) * 100;
    const waistProgress = (waistReduction / (userData.startWaist - userData.targetWaist)) * 100;
    
    // Calculate weekly average loss
    const weeklyWeightLoss = weightLoss / Math.max(userData.weekNumber, 1);
    const projectedFinalWeight = userData.currentWeight - (weeklyWeightLoss * (12 - userData.weekNumber));
    
    return { 
      weightLoss, 
      waistReduction, 
      weightProgress, 
      waistProgress, 
      weeklyWeightLoss,
      projectedFinalWeight
    };
  };

  const progress = calculateProgress();

  // Enhanced Dashboard with Charts
  const DashboardTab = () => (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Current Weight</p>
              <p className="text-2xl font-bold text-blue-900">{userData.currentWeight} kg</p>
            </div>
            <TrendingDown className="h-8 w-8 text-blue-600" />
          </div>
          <p className="text-xs text-blue-500 mt-1">
            {progress.weightLoss.toFixed(1)} kg lost • {progress.weeklyWeightLoss.toFixed(2)} kg/week
          </p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Waist</p>
              <p className="text-2xl font-bold text-green-900">{userData.currentWaist} cm</p>
            </div>
            <Target className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-xs text-green-500 mt-1">
            {progress.waistReduction.toFixed(1)} cm reduced • {progress.waistProgress.toFixed(1)}% to goal
          </p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Phase Progress</p>
              <p className="text-2xl font-bold text-purple-900">Phase {userData.currentPhase}</p>
            </div>
            <Activity className="h-8 w-8 text-purple-600" />
          </div>
          <p className="text-xs text-purple-500 mt-1">Week {userData.weekNumber} of 12</p>
        </div>

        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Daily Calories</p>
              <p className="text-2xl font-bold text-orange-900">{userData.dailyCalories}</p>
              {userData.lastCalorieAdjustment && (
                <p className="text-xs text-orange-500">🤖 Auto-adjusted</p>
              )}
            </div>
            <Utensils className="h-8 w-8 text-orange-600" />
          </div>
          <p className="text-xs text-orange-500 mt-1">
            {userData.dailyProtein}g protein • {userData.dailyCarbs}g carbs • {userData.dailyFat}g fat
          </p>
        </div>
      </div>

      {/* Progress Charts */}
      {historicalData.length > 1 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Weight Progress</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={['dataMin - 2', 'dataMax + 1']} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="weight" stroke="#2563eb" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Waist Circumference</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historicalData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={['dataMin - 2', 'dataMax + 1']} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="waist" stroke="#059669" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg border border-gray-200 text-center">
          <BarChart3 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Progress Data Yet</h3>
          <p className="text-gray-600 mb-4">Start logging your daily measurements to see progress charts</p>
          <p className="text-sm text-gray-500">Need at least 2 data points to display charts</p>
        </div>
      )}

      {/* Smart Automation Status */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">🤖 Smart Coach Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Plateau Monitor</h4>
              <span className={`text-xs px-2 py-1 rounded-full ${
                detectPlateau().hasPlateau ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
              }`}>
                {detectPlateau().hasPlateau ? 'Alert' : 'Good'}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {detectPlateau().hasPlateau 
                ? 'Plateau detected - adjustments needed' 
                : 'Progress tracking normally'}
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Auto Calories</h4>
              <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                {userData.dailyCalories} kcal
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {autoAdjustCalories() 
                ? `Adjustment suggested: ${autoAdjustCalories().adjustment > 0 ? '+' : ''}${autoAdjustCalories().adjustment} kcal`
                : 'Current intake optimal'}
            </p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Weekly Planner</h4>
              <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800">
                Ready
              </span>
            </div>
            <p className="text-sm text-gray-600">
              Phase {userData.currentPhase} meal & workout plans available
            </p>
          </div>
        </div>
      </div>

      {/* Weekly Planning Wizard */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Weekly Planning Wizard</h3>
          <button
            onClick={() => {
              const weeklyPlan = generateWeeklyPlan();
              setWeeklyMealPlan(weeklyPlan.mealSuggestions);
              // Show notification
              alert('Next week\'s meal and workout plan generated! Check the Meal Planning tab for details.');
            }}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 flex items-center space-x-2"
          >
            <Zap className="h-4 w-4" />
            <span>Generate Next Week</span>
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">🍽️ Meal Planning</h4>
            <p className="text-sm text-blue-700 mb-2">Auto-generates balanced weekly meal plan</p>
            <ul className="text-xs text-blue-600 space-y-1">
              <li>• Rotates through proven recipes</li>
              <li>• Matches your macro targets</li>
              <li>• Creates shopping list automatically</li>
            </ul>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">💪 Workout Schedule</h4>
            <p className="text-sm text-green-700 mb-2">Phase-appropriate training plan</p>
            <ul className="text-xs text-green-600 space-y-1">
              <li>• Adapts to current phase ({userData.currentPhase})</li>
              <li>• Balances strength + cardio</li>
              <li>• Includes recovery days</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Daily Log Summary */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Entry</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
            <input
              type="number"
              step="0.1"
              value={dailyLog.weight}
              onChange={(e) => setDailyLog(prev => ({ ...prev, weight: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Waist (cm)</label>
            <input
              type="number"
              step="0.1"
              value={dailyLog.waist}
              onChange={(e) => setDailyLog(prev => ({ ...prev, waist: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Sleep (hrs)</label>
            <input
              type="number"
              step="0.5"
              value={dailyLog.sleep}
              onChange={(e) => setDailyLog(prev => ({ ...prev, sleep: parseFloat(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mood (1-10)</label>
            <input
              type="range"
              min="1"
              max="10"
              value={dailyLog.mood}
              onChange={(e) => setDailyLog(prev => ({ ...prev, mood: parseInt(e.target.value) }))}
              className="w-full"
            />
          </div>
        </div>
        <button
          onClick={saveDailyData}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save Today's Data
        </button>
      </div>
    </div>
  );

  // Enhanced Nutrition with Recipe Management
  const NutritionTab = () => (
    <div className="space-y-6">
      {/* Recipe Database */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recipe Database</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes.map(recipe => (
            <div key={recipe.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium text-gray-900">{recipe.name}</h4>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                  {recipe.category}
                </span>
              </div>
              <div className="text-sm text-gray-600 mb-3">
                <p>⏱️ {recipe.prepTime} min • 🍽️ {recipe.servings} serving</p>
                <p>{recipe.calories} kcal • {recipe.protein}g protein</p>
              </div>
              <div className="space-y-2">
                <details className="text-sm">
                  <summary className="cursor-pointer text-blue-600">Ingredients</summary>
                  <ul className="mt-2 space-y-1">
                    {recipe.ingredients.map((ing, idx) => (
                      <li key={idx} className="text-gray-600">
                        {ing.amount} {ing.unit} {ing.item}
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Meal Planner */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Weekly Meal Plan</h3>
          <button
            onClick={generateShoppingList}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center space-x-2"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Generate Shopping List</span>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left font-medium text-gray-900">Day</th>
                <th className="px-4 py-2 text-left font-medium text-gray-900">Breakfast</th>
                <th className="px-4 py-2 text-left font-medium text-gray-900">Lunch</th>
                <th className="px-4 py-2 text-left font-medium text-gray-900">Dinner</th>
                <th className="px-4 py-2 text-left font-medium text-gray-900">Snack</th>
              </tr>
            </thead>
            <tbody>
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                <tr key={day} className="border-t">
                  <td className="px-4 py-2 font-medium text-gray-900">{day}</td>
                  {['breakfast', 'lunch', 'dinner', 'snacks'].map(mealType => (
                    <td key={mealType} className="px-4 py-2">
                      <select
                        value={weeklyMealPlan[day]?.[mealType] || ''}
                        onChange={(e) => addToMealPlan(day, mealType, parseInt(e.target.value))}
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                      >
                        <option value="">Select recipe</option>
                        {recipes.filter(r => r.category === mealType).map(recipe => (
                          <option key={recipe.id} value={recipe.id}>{recipe.name}</option>
                        ))}
                      </select>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Shopping List */}
      {shoppingList.length > 0 && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Generated Shopping List</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {shoppingList.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                <input type="checkbox" className="h-4 w-4 text-blue-600" />
                <span className="text-sm">{item.amount} {item.unit} {item.item}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // Progress Photos with Comparison
  const ProgressTab = () => (
    <div className="space-y-6">
      {/* Photo Upload */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Progress Photos</h3>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <Camera className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">Upload your weekly progress photos</p>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="mt-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      </div>

      {/* Photo Timeline & Comparison */}
      {progressPhotos.length > 0 && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Photo Timeline ({progressPhotos.length} photos)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {progressPhotos.map(photo => (
              <div key={photo.id} className="border border-gray-200 rounded-lg p-4">
                <div className="relative">
                  <img
                    src={photo.url}
                    alt={`Progress Week ${photo.week}`}
                    className="w-full h-48 object-cover rounded-lg mb-2"
                  />
                  <button
                    onClick={() => deletePhoto(photo.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="text-sm">
                  <p className="font-medium">Week {photo.week}</p>
                  <p className="text-gray-600">{photo.date}</p>
                  {photo.fileSize && (
                    <p className="text-xs text-gray-500">{photo.fileSize}KB</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Side-by-Side Comparison */}
      {progressPhotos.length >= 2 && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Before & After Comparison</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <h4 className="font-medium text-gray-900 mb-2">Week 1 (Start)</h4>
              <img
                src={progressPhotos[0].url}
                alt="Starting photo"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            <div className="text-center">
              <h4 className="font-medium text-gray-900 mb-2">Week {progressPhotos[progressPhotos.length - 1].week} (Latest)</h4>
              <img
                src={progressPhotos[progressPhotos.length - 1].url}
                alt="Latest photo"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      )}

      {/* Data Entry */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Measurements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
            <input
              type="number"
              step="0.1"
              value={dailyLog.weight}
              onChange={(e) => setDailyLog(prev => ({ ...prev, weight: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Waist Circumference (cm)</label>
            <input
              type="number"
              step="0.1"
              value={dailyLog.waist}
              onChange={(e) => setDailyLog(prev => ({ ...prev, waist: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <button
          onClick={saveDailyData}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Save Measurements
        </button>
      </div>
    </div>
  );

  const WorkoutTab = () => (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Phase {userData.currentPhase} Training Plan</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-red-50 rounded-lg">
            <h4 className="font-medium text-red-900 mb-2">Cardio Focus</h4>
            <p className="text-sm text-red-700">
              {userData.currentPhase === 1 && "3× low-impact (bike, elliptical, swim) at Zone 2 HR"}
              {userData.currentPhase === 2 && "4× (2 low-impact + 2 walk-run intervals; start C25K W1)"}
              {userData.currentPhase === 3 && "3× runs (easy, tempo, long) + 1 HIIT bike"}
            </p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium text-blue-900 mb-2">Strength Training</h4>
            <p className="text-sm text-blue-700">
              {userData.currentPhase === 1 && "3× full-body machines (moderate load 12-15 reps × 3)"}
              {userData.currentPhase === 2 && "4× Upper/Lower split, progress to 8-12 reps"}
              {userData.currentPhase === 3 && "4× Push/Pull/Legs/Full (progressive overload)"}
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h4 className="font-medium text-green-900 mb-2">Mobility & Recovery</h4>
            <p className="text-sm text-green-700">
              {userData.currentPhase === 1 && "Daily 10 min (bird-dog, dead-bug, glute bridges, hip openers)"}
              {userData.currentPhase === 2 && "3× yoga / pool stretch"}
              {userData.currentPhase === 3 && "Pilates class 1×"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Settings Tab for data management
  const SettingsTab = () => (
    <div className="space-y-6">
      {/* Data Management */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Management</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Data Status</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Historical entries: {historicalData.length}</li>
                <li>• Progress photos: {progressPhotos.length}</li>
                <li>• Meal plans: {Object.keys(weeklyMealPlan).length} days</li>
                <li>• Shopping items: {shoppingList.length}</li>
              </ul>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Storage Info</h4>
              <p className="text-sm text-green-700 mb-2">
                All data is stored locally on your device
              </p>
              <p className="text-xs text-green-600">
                Photos: ~{Math.round(progressPhotos.reduce((acc, photo) => acc + (photo.fileSize || 0), 0) / 1024)}MB used
              </p>
            </div>
          </div>
          
          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3">Danger Zone</h4>
            <button
              onClick={clearAllData}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center space-x-2"
            >
              <Trash2 className="h-4 w-4" />
              <span>Clear All Data</span>
            </button>
            <p className="text-xs text-gray-500 mt-2">
              This will permanently delete all your progress data, photos, and meal plans
            </p>
          </div>
        </div>
      </div>

      {/* Export/Import Data */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Backup & Restore</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => {
              const allData = {
                userData,
                historicalData,
                progressPhotos: progressPhotos.map(p => ({ ...p, url: '[Photo data removed for export]' })), // Remove base64 for size
                weeklyMealPlan,
                shoppingList,
                exportDate: new Date().toISOString()
              };
              const dataStr = JSON.stringify(allData, null, 2);
              const dataBlob = new Blob([dataStr], { type: 'application/json' });
              const url = URL.createObjectURL(dataBlob);
              const link = document.createElement('a');
              link.href = url;
              link.download = `fitness-backup-${new Date().toISOString().split('T')[0]}.json`;
              link.click();
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center space-x-2"
          >
            <Camera className="h-4 w-4" />
            <span>Export Data</span>
          </button>
          
          <div className="text-center">
            <input
              type="file"
              accept=".json"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    try {
                      const importedData = JSON.parse(event.target.result);
                      if (window.confirm('This will replace your current data. Continue?')) {
                        if (importedData.userData) setUserData(importedData.userData);
                        if (importedData.historicalData) setHistoricalData(importedData.historicalData);
                        if (importedData.weeklyMealPlan) setWeeklyMealPlan(importedData.weeklyMealPlan);
                        if (importedData.shoppingList) setShoppingList(importedData.shoppingList);
                        alert('✅ Data imported successfully!');
                      }
                    } catch (error) {
                      alert('❌ Invalid file format');
                    }
                  };
                  reader.readAsText(file);
                }
              }}
              className="hidden"
              id="import-data"
            />
            <label
              htmlFor="import-data"
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 cursor-pointer inline-flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Import Data</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'nutrition', label: 'Meal Planning', icon: ChefHat },
    { id: 'workout', label: 'Training', icon: Target },
    { id: 'progress', label: 'Progress Photos', icon: Camera },
    { id: 'settings', label: 'Settings', icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <Zap className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">3-Month Fat Loss Journey</h1>
            </div>
            <div className="text-sm text-gray-600">
              Week {userData.weekNumber} • Phase {userData.currentPhase}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && <DashboardTab />}
        {activeTab === 'nutrition' && <NutritionTab />}
        {activeTab === 'workout' && <WorkoutTab />}
        {activeTab === 'progress' && <ProgressTab />}
        {activeTab === 'settings' && <SettingsTab />}
      </div>

      {/* Smart Automation Alerts */}
      {(() => {
        const plateauCheck = detectPlateau();
        const calorieAdjustment = autoAdjustCalories();
        const showAlert = plateauCheck.hasPlateau || calorieAdjustment || progress.weeklyWeightLoss > 1.2 || dailyLog.sleep < 6;
        
        if (!showAlert) return null;
        
        return (
          <div className="fixed bottom-4 right-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 max-w-sm">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-yellow-800">🤖 Smart Coach Alert</h4>
                
                {plateauCheck.hasPlateau && (
                  <div className="text-sm text-yellow-700 p-2 bg-yellow-100 rounded">
                    <strong>Plateau Detected:</strong> {plateauCheck.message}
                  </div>
                )}
                
                {calorieAdjustment && (
                  <div className="text-sm text-yellow-700 p-2 bg-blue-100 rounded">
                    <strong>Auto-Adjustment:</strong> {calorieAdjustment.reason}
                    <br />New target: <strong>{calorieAdjustment.newCalories} calories</strong>
                  </div>
                )}
                
                {progress.weeklyWeightLoss > 1.2 && !calorieAdjustment && (
                  <div className="text-sm text-yellow-700">
                    Weight loss may be too rapid. Consider increasing calories by 150.
                  </div>
                )}
                
                {dailyLog.sleep < 6 && (
                  <div className="text-sm text-yellow-700">
                    Low sleep affects recovery and metabolism.
                  </div>
                )}
                
                <button
                  onClick={() => setUserData(prev => ({ ...prev, plateauAlert: false }))}
                  className="text-xs text-yellow-600 underline"
                >
                  Dismiss alerts
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
};

export default FitnessTracker;
