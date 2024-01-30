import { StatusBar } from 'react-native';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
//  import { NativeBaseProvider } from 'native-base';
import  Toast  from 'react-native-toast-message';
import { StripeProvider } from '@stripe/stripe-react-native';

//import { StripeProvider } from '@stripe/stripe-react-native';


//Redux
import { Provider } from 'react-redux';
import store from './Redux/store';
///Context API
import Auth from './Context/store/Auth';

//Navigators
import Main from './Navigators/Main';

//Screens
import ProductContainer from './Screens/Products/ProductContainer';
//import Header from './Shared/Header';
import Header from './Shared/Header'
import { NativeBaseProvider, extendTheme } from 'native-base';

const newColorTheme = {
  brand: {
    900: '#5B8DF6',
    800: '#ffffff',
    700: '#cccccc',
  },
};

const theme = extendTheme({
colors: newColorTheme,
});
const STRIPE_KEY ='pk_test_51NbGu3FODGQ4vMLC2NPI9wPMBGBeHak3YYHxzEW63a078luhKYcfO51V99E7CdXwQtpXzbMP6vVvMADTGDYV6LtX00xK17HBb6'

export default function App() {
  return (
    <Auth>
       <Provider store={store}>
        <StripeProvider publishableKey={STRIPE_KEY}>
       
       <NativeBaseProvider 
      //  theme={theme}
       >
       
    <NavigationContainer>
       <Header></Header>
        <Main></Main>
       <Toast /> 
      </NavigationContainer>
     
      </NativeBaseProvider>
      </StripeProvider>
    
      </Provider>
    </Auth>
   
  );
}



