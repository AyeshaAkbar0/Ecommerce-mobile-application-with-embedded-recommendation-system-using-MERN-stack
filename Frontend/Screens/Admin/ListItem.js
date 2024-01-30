import React, {useState} from "react"
import {
    View, StyleSheet, Text, Image, TouchableHighLight,
    TouchableOpacity,Button, Dimensions,
    Modal
}
from "react-native"
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import Icon from "react-native-vector-icons/FontAwesome"
import { ScrollView } from "react-native-gesture-handler";
var {width} = Dimensions.get("window");
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
var height=Dimensions.get('window');

const ListItem =(props)=>{
const[modalVisible, setModalVisible] = useState(false);
const navigation = useNavigation();
// console.log("Gotten image is :", props.image);


    return(
        <View  >
          
          <Modal
          style={{width:width}}
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={()=>{
            setModalVisible(false)
          }}
          >
            <View 
            style={styles.centeredView}
            >
              <View 
              style={styles.modalView}
              >
                <TouchableOpacity
                underlayColor="#E8E8E8"
                onPress={()=>{
                  setModalVisible(false)
                }}
                style={{
                  alignSelf:"flex-end",
                  position:"absolute",
                  top:5,
                  right:10

                }}
                >
                  <Icon name="close"  size={20}></Icon>
                </TouchableOpacity>
               
                <EasyButton
              medium
              secondary
              onPress={() => [
                props.navigation.navigate("ProductForm", { item: props }),
                setModalVisible(false),
              ]}
            >
                  <Text style={styles.textStyle}>Edit</Text>
                </EasyButton>
                <EasyButton medium danger
                onPress={()=>[props.delete(props._id), setModalVisible(false)]

                }
                >
                  <Text style={styles.textStyle}>Delete</Text>
                </EasyButton>
              </View>
            </View>

          </Modal>
            <TouchableOpacity  style={[styles.container,{
                backgroundColor:props.index %2 ==0? "white": "white"
            }]}
            onPress={()=>{
               props.navigation.navigate("Product Detail", {item:props})
                         //navigation.navigate('User', { screen: 'Login' });
            }}


            onLongPress={()=>{
              setModalVisible(true)
            }}
            >
              <>
              <View style={styles.BookDetail}>

                <Image
                style={styles.image}
                source={{uri: props.image? props.image:
                "https://img.freepik.com/free-vector/vector-blank-book-cover-isolated-white_1284-41904.jpg?w=2000"
            
            
            }}>
          </Image>
          <View style={styles.details}>
            <View style={{ alignContent:'flex-start'}}>
              <Text style={styles.itemAu}>Title:</Text>
              <Text  style={styles.itemName} numberOfLines={2} >{props.book_Title}</Text>

            </View>
  {/* <Text style={styles.itemTi} numberOfLines={1} ellipsizeMode="tail">Title: {props.book_Title}</Text> */}
  <View style={{  alignContent:'flex-start' }}>
    <Text style={styles.itemAu}>Author :</Text>
    <Text style={styles.itemName} numberOfLines={2}  >{props.Book_Author}</Text>
  </View>
  <View 
  style={{ alignContent:'flex-start' }}
  >
              <Text style={styles.itemAu}>Category:</Text>
              <Text  style={styles.itemName} numberOfLines={2} >{props.category.name}</Text>

            </View>
  {/* <Text style={styles.itemCa} numberOfLines={1} ellipsizeMode="tail">Category:  {props.category.name}</Text> */}
  <Text style={styles.itemPr}>Price:  ${props.price}</Text>
</View>

                </View>
                
                </>
            </TouchableOpacity>
          
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
   flexDirection: 'column', // Default is column
   //justifyContent: 'center', // Aligns items along the primary axis (vertically in this case)
  // alignItems: 'flex-start',
   //padding:-15, marginTop:20,
   width:"100%",
   //marginBottom:10,
   // alignItems: "center",
   // borderBottomWidth: 2,
   // borderBottomColor: "#8E99A1",
    //marginTop:20,
    //bottom:20
    //height:height+1000,
   // width: width, // Set the container width to utilize the whole screen width
  },
  image: {
    // borderRadius: 10,
    width: 90, // Set a fixed width for the image
    height: 240,
    //marginRight: 250, 
    marginLeft:30,
  //  marginRight:-140,
    marginTop:-10,
    resizeMode:"contain",
  },
  details:{
     marginLeft:140,
     marginTop:-190,
     
    // marginBottom:45,
  
     
  },
  BookDetail:{
   flex:1,
   //flexDirection:"row"
   //alignContent:'flex-start',
   
  },

  itemAu: {
     fontSize:14,
     fontWeight:"bold",
     //color:"black",
    //  padding:2,
    //  borderBottomWidth:1,
     //flexWrap:'wrap',
  },
  itemName:{
    flex:1,
    fontSize:14,  
    // borderBottomWidth: 1,
    // padding:2,
    flexWrap:'wrap',



  },
  itemTi: {
    
    fontSize:17,
    borderBottomWidth: 1,
    padding:2,
   // flexWrap:'wrap',

  },
  itemCa: {
    flex:1,
    fontSize:16,
    borderBottomWidth: 1,
    padding:2,
       flexWrap:'wrap',


  },
  itemPr: {
    fontSize:14,
    // borderBottomWidth: 1,
    // padding:2,

  },
  centeredView: {
    //justifyContent: "center",
    //alignItems: "center",
    //width: width,
  },
  modalView: {
    marginTop:340,
  
    alignSelf:"center"
,    margin: 10,
    width: width/2,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 19,
    alignItems: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 3,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  // modalView: {
  //   margin: 20,
  //   backgroundColor: "white",
  //   borderRadius: 20,
  //   padding: 35,
  //   alignItems: "center",
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 3.84,
  //   elevation: 5,
  // },
  textStyle: {
    color: "black",
    fontWeight: "bold",
  },
});


export default ListItem