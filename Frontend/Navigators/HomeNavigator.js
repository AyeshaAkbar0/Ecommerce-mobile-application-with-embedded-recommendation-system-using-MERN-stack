import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ProductContainer from '../Screens/Products/ProductContainer'
import SingleProduct from '../Screens/Products/SingleProduct'
import NewComp from '../Screens/Products/NewComp'
import PriceFilter from '../Screens/Products/PriceRangeFilter'
import Reviews from '../Screens/Products/Reviews'
const Stack = createStackNavigator()


function MyStack(){
    return(
        <Stack.Navigator
        screenOptions={{
            headerShown: false,
            
            headerStyle:{
                //backgroundColor:'#6DB5CA'
            },
            // headerTintColor:'#17103A',
            //headerTintColor:'#FCF5EF',
            headerTintColor:'black',
            headerTitleStyle:{
                fontSize:25
            }
          }}
        >
            <Stack.Screen 
            name='Home'
            component={ProductContainer}
         
        />
             <Stack.Screen 
            name='Product Detail'
            component={SingleProduct}
            options={{
                headerShown: false,
              }}
            />
               <Stack.Screen 
            name='Price Filter'
            component={PriceFilter}
            options={{
                headerShown: false,
              }}
            />
               <Stack.Screen 
            name='Reviews'
            component={Reviews}
            options={{
                headerShown: true,
              }}
            />

          
        </Stack.Navigator>
    )
}
export default function HomeNavigator()
{
    return <MyStack/>
}