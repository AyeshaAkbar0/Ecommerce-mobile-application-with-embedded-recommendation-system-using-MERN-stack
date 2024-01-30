// import React , {useContext}from 'react'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
// // import { FontAwesome} from 'react-native-vector-icons';
// import {View} from 'react-native'
// import  Icon from 'react-native-vector-icons/FontAwesome'
// //Stack
// import HomeNavigator from './HomeNavigator'
// import CartNavigator from "./CartNavigator";
// import CartIcon from '../Shared/CartIcon';
// import UserNavigator from './UserNavigator';
// import AdminNavigator from './AdminNavigator';
// import AuthGlobal from '../Context/store/AuthGlobal'
// import { SearchIcon } from 'native-base'

// const Tab = createBottomTabNavigator();

// const Main=()=>{

//     const context=useContext(AuthGlobal)
//     return (
//     <Tab.Navigator
//     initialRouteName="Home"
    
//       tabBarOptions={{
        
      
//        keyboardHidesTabBar: true,
//         showLabel: true,
        
        
//         activeTintColor: "#FF7235",
      
//       }}

//     >



 
         
//       {/* {context.stateUser.user.isAdmin==true?( */}
//          <Tab.Screen
//          name='Admin'
//          component={AdminNavigator}
//          options={{
//           headerShown:false,
//            tabBarIcon:({color})=>(<Icon name="cog"
//            color="black" size ={30}></Icon>)
//          }}
//          />

//       {/* ):
//       (
//         <> */}
//         <Tab.Screen
//          name="Home"
//         component={HomeNavigator}
//         options={{
//           headerShown:false,
//           tabBarIcon: ({ color }) => (
            
//             <Icon name="home"  color="black" size={30} />
//           ),
//         }}
//       />
//       <Tab.Screen
//       name='Cart'
//       component={CartNavigator}
//       options={{
//         headerShown:false,
//         tabBarIcon:({color})=>(
//         <View>
//           {/* <FontAwesome name="shopping-cart" size={24} color="black" /> */}
//         <Icon name="shopping-cart" size={24} color="black" />
//         <CartIcon/></View>)
//       }}
    
//       />
//       {/* </>
//       )
//       } */}
       
//          <Tab.Screen
//       name='User'
//       component={UserNavigator}
//       options={{
//         headerShown:false,
//         tabBarIcon:({color})=>(<Icon name="user"
//         color="black" size ={30}></Icon>)
//       }}
//       />
//         </Tab.Navigator>
//     );


// };
// export default Main;







import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AuthGlobal from '../Context/store/AuthGlobal';
import HomeNavigator from './HomeNavigator'
import CartNavigator from "./CartNavigator";
import CartIcon from '../Shared/CartIcon';
import UserNavigator from './UserNavigator';
import AdminNavigator from './AdminNavigator';
//import AuthGlobal from '../Context/store/AuthGlobal'
import { SearchIcon } from 'native-base'

const Tab = createBottomTabNavigator();

const Main = () => {
  const context = useContext(AuthGlobal);

  const isAdmin = context.stateUser.user.isAdmin;
  const isAuthenticated = context.stateUser.isAuthenticated;

  const getTabBarIconSize = (focused) => {
    return focused ? 40 : 30; // Adjust the icon size based on focus
  };

  const getTabBarIconColor = (focused, activeColor, inactiveColor) => {
    return focused ? activeColor : inactiveColor; // Adjust the icon color based on focus
  };

  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: true,
        activeTintColor: "#FF7235",
      }}
    >
   
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="home"
              color={getTabBarIconColor(focused, "#FF7235", "black")}
              size={getTabBarIconSize(focused)}
            />
          ),
        }}
      />
      
      {!isAdmin && (
        
     
      <Tab.Screen
        name='Cart'
        component={CartNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <View>
              <Icon
                name="shopping-cart"
                color={getTabBarIconColor(focused, "#FF7235", "black")}
                size={getTabBarIconSize(focused)}
              />
              <CartIcon />
            </View>
          ),
        }}
      />
     
  
      )}
       
       {isAdmin && (
        <Tab.Screen
        name='Admin'
        component={AdminNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <Icon
              name="cog"
              color={getTabBarIconColor(focused, "#FF7235", "black")}
              size={getTabBarIconSize(focused)}
            />
          )
        }}
      />
       )}
     
     

       
        
       
      
        <Tab.Screen
      name='User'
      component={UserNavigator}
      options={{
        headerShown: false,
        tabBarIcon: ({ focused, color }) => (
          <Icon
            name="user"
            color={getTabBarIconColor(focused, "#FF7235", "black")}
            size={getTabBarIconSize(focused)}
          />
        ),
      }}
    />
     
    </Tab.Navigator>
  );
};

export default Main;
