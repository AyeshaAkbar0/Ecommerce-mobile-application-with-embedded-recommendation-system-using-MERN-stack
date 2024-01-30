import React from "react"
import { createStackNavigator } from "@react-navigation/stack"

import Orders from "../Screens/Admin/Orders"
import Products from "../Screens/Admin/Products"
import ProductForm from "../Screens/Admin/ProductForm"
import Categories from "../Screens/Admin/Categories"
import AddProduct from "../Screens/Admin/AddProduct"
import StatisticsScreen from "../Screens/Admin/StatisticsScreen"

const Stack = createStackNavigator();
function MyStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen
             name="Products"
             component={Products}
             options={{
                   headerShown:false,
                
                title:"Products"
             }}
            />
            <Stack.Screen  name="Categories" component={Categories}
            options={{
            // headerShown:false
             }}
            />
            <Stack.Screen  name="Orders" component={Orders}
            
            />
            <Stack.Screen  name="ProductForm" component={ProductForm}/>
            <Stack.Screen name="Add Product" component={AddProduct}></Stack.Screen>
            <Stack.Screen name ="StatisticsScreen"  component={StatisticsScreen}></Stack.Screen>
        
        </Stack.Navigator>
    )
}

export default function AdminNavigator(){
    return <MyStack/>
    
}