import React, { useEffect, useState } from "react";
import { View, 
    Text,
    ActivityIndicator, 
    TouchableOpacity,
    ToastAndroid, 
    FlatList,
    Image,
    Pressable,
    StatusBar,
    Modal,
    TextInput} from 'react-native';
import { MainStyles } from "../styles";
import filter from 'lodash.filter';
import { add } from "react-native-reanimated";
const Home=()=>{

    const [contactData,setContactData] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    const [addModalVisible,setAddModalVisible] = useState(false)
    const [editModalVisible,setEditModalVisible] = useState(false)
    const [fullData, setFullData] = useState([]);
    const [query, setQuery] = useState('');    

    const [photo,setPhoto] = useState()
    const [ages,setAges] = useState()
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [userId,setUserId]= useState('')

    useEffect(()=>{
        setIsLoading(true)
        fetchContactData()
    },[])

    async function fetchContactData() {
        try {
            await fetch(`https://simple-contact-crud.herokuapp.com/contact`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json'
                }
              })
              .then((response) => response.json())
              .then((res) => {                                                                                                                 
                setContactData(res.data)
                setFullData(res.data)
                setIsLoading(false)
                })
                .done();                    

          } catch(e) {            
            console.log(e)
            ToastAndroid.showWithGravityAndOffset("Network Error!",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50)
        }
    }                

    async function InputNewData() {
        if(firstName == '' || lastName == '' || ages == ''){
            return(
                ToastAndroid.showWithGravityAndOffset("Some contact data is Empty!",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50)
            )
        }else{

            try {
                await fetch(`https://simple-contact-crud.herokuapp.com/contact`, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({
                        "firstName": firstName,
                        "lastName": lastName,
                        "age": ages,
                        "photo": photo == null ? "N/A" : photo 
                    })
                  })
                  .then((response) => response.json())
                  .then((res) => {  
                    if(res.message === "contact saved"){
                        ToastAndroid.showWithGravityAndOffset("Adding New Data Success!",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50)    
                        setAddModalVisible(!addModalVisible)
                        setIsLoading(true)
                        fetchContactData()
                    }else{
                        ToastAndroid.showWithGravityAndOffset("Failed adding new data!",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50)    
                        setIsLoading(true)
                        fetchContactData()
                        setAddModalVisible(!addModalVisible)
                    }                    
                    })
                    .done();                    
    
              } catch(e) {            
                console.log(e)
                ToastAndroid.showWithGravityAndOffset("Network Error!",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50)
            }

        }
        
    }

    async function DeleteData() {
        try {
            await fetch(`https://simple-contact-crud.herokuapp.com/contact/${userId}`, {
                method: "DELETE",
                headers: {
                    'Accept': 'application/json'
                }
              })
              .then((response) => response.json())
              .then((res) => {                  
                if(res.message == "contact deleted"){
                    
                    fetchContactData()
                    setEditModalVisible(!editModalVisible)
                    ToastAndroid.showWithGravityAndOffset("Contact deleted!",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50)
                }else{
                    
                    fetchContactData()
                    setEditModalVisible(!editModalVisible)
                    ToastAndroid.showWithGravityAndOffset("Failed to delete contact!",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50)
                }                                                                                                                               
                })
                .done();                    

          } catch(e) {            
            console.log(e)
            ToastAndroid.showWithGravityAndOffset("Network Error!",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50)
        }
    }
    
    async function UpdateData() {
        try {
            await fetch(`https://simple-contact-crud.herokuapp.com/contact/${userId}`, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    "firstName": firstName,
                    "lastName": lastName,
                    "age": ages,
                    "photo": photo == null ? "N/A" : photo 
                })
              })
              .then((response) => response.json())
              .then((res) => {                         
                if(res.message == "Contact edited"){
                    
                    fetchContactData()
                    setEditModalVisible(!editModalVisible)
                    ToastAndroid.showWithGravityAndOffset("Contact edited!",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50)
                }else{
                    
                    fetchContactData()
                    setEditModalVisible(!editModalVisible)
                    ToastAndroid.showWithGravityAndOffset("Failed to edit contact!",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50)
                }                                                                                                                               
                })
                .done();                    

          } catch(e) {            
            console.log(e)
            ToastAndroid.showWithGravityAndOffset("Network Error!",ToastAndroid.LONG,ToastAndroid.BOTTOM,25,50)
        }
    }

    const handleSearch = text => {
        const formattedQuery = text.toLowerCase();
        const filteredData = filter(fullData, user => {
            console.log(user)
            return contains(user, formattedQuery);
        });

        setContactData(filteredData);
        setQuery(text);

    };
      
    const contains = (user, query) => {        
    
    if (user.firstName.includes(query) || user.lastName.includes(query)) {
        return true;
    }
    
    return false;
    };
    
    function RenderSearchBar() {
        return (
          <View style={MainStyles.searchBarContainer}>
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="always"
              value={query}
              onChangeText={queryText => handleSearch(queryText)}
              placeholder="Search"
              style={{ paddingHorizontal: 20 }}
            />
          </View>
        );
    }


    return (
        <>  
            <StatusBar barStyle={'dark-content'} backgroundColor={'#f3f4ed'} />
            {isLoading == true ? 
                <View style={MainStyles.ContainerCenter}>
                    <ActivityIndicator size="large" color="#1256C2" />
                </View>
                :
                <View style={MainStyles.Container}>
                    {fullData.length == 0 ? 
                        <View style={MainStyles.ContainerCenter}> 
                            <Text style={MainStyles.title} >No registered contact</Text>
                        </View>
                        :
                        <>
                        <RenderSearchBar/>                        
                        <FlatList
                        data={contactData}
                        keyExtractor={ item =>item.id}
                        renderItem={({item})=>
                            <Pressable onPress={()=>{
                                setUserId(item.id)
                                setPhoto(item.photo)
                                setFirstName(item.firstName)
                                setLastName(item.lastName)
                                setAges(item.age.toString())
                                setEditModalVisible(!editModalVisible)
                            }} > 
                                <View style={MainStyles.listItem}>
                                    <Image
                                    source={item.photo === 'N/A' ? require('../assets/blankimage.png'):{ uri: item.photo }}
                                    style={MainStyles.coverImage}
                                    resizeMode={'cover'}
                                    />
                                    <View style={MainStyles.metaInfo}>
                                    <Text style={MainStyles.title}>{item.firstName} {item.lastName}</Text>
                                    <Text style={MainStyles.subTitle}>Ages {item.age}</Text>
                                    </View>
                                </View>
                            </Pressable>
                        }
                        />
                        </>
                    }
                    <Modal                                      
                        transparent={true}
                        visible={addModalVisible}
                        onRequestClose={() => {            
                        setAddModalVisible(!addModalVisible);
                        }}
                    >
                        <View style={MainStyles.centeredView}>
                        <View style={MainStyles.modalView}>                            
                            <Image
                                source={photo === "N/A" ? require('../assets/blankimage.png'): { uri: photo }}
                                style={[MainStyles.coverImage,{marginVertical:12}]}
                                resizeMode={'cover'}
                            />
                            
                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                clearButtonMode="always"
                                value={firstName}                            
                                onChangeText={text => setFirstName(text)}
                                placeholder="First Name"
                                textAlign={'center'}
                                style={{ padding: 0,marginHorizontal:8,marginVertical:4}}
                            />
                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                clearButtonMode="always"
                                value={lastName}
                                onChangeText={text => setLastName(text)}
                                placeholder="Last Name"
                                textAlign={'center'}
                                style={{ padding: 0,marginHorizontal:8,marginVertical:4}}
                            />                            
                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                clearButtonMode="always"
                                value={ages}
                                onChangeText={text => setAges(text)}
                                placeholder="Ages"
                                textAlign={'center'}
                                style={{ padding: 0,marginHorizontal:8,marginVertical:4}}
                                keyboardType={'number-pad'}
                            />
                            <View style={{borderBottomWidth:1,width:120,borderBottomColor:'#ddd'}}/>
                            
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                
                                <View style={{flexDirection:'row',alignItems:'center',marginTop:16}} >
                                    
                                    <Pressable onPress={() => setAddModalVisible(!addModalVisible)}>
                                        <Text style={{color:'#1256C2'}}>Cancle</Text>
                                    </Pressable>

                                    <Pressable onPress={()=>InputNewData()}>   
                                        <View style={{marginLeft:16,backgroundColor:'#1256C2',paddingTop:4,paddingBottom:4,paddingLeft:8,paddingRight:8,borderRadius:8,alignItems:'center',justifyContent:'center'}} >
                                            <Text style={{color:'#fff'}}>Save</Text>
                                        </View>
                                    </Pressable>

                                </View>
                            </View>

                        </View>
                        </View>
                    </Modal>

                    <Modal                                      
                        transparent={true}
                        visible={editModalVisible}
                        onRequestClose={() => {            
                        setEditModalVisible(!editModalVisible)
                        }}
                    >
                        <View style={MainStyles.centeredView}>
                        <View style={MainStyles.modalView}>                            
                            <Image
                                source={photo === "N/A" ? require('../assets/blankimage.png'): { uri: photo }}
                                style={[MainStyles.coverImage,{marginVertical:12}]}
                                resizeMode={'cover'}
                            />
                            
                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                clearButtonMode="always"
                                value={firstName}                            
                                onChangeText={text => setFirstName(text)}
                                placeholder="First Name"
                                textAlign={'center'}
                                style={{ padding: 0,marginHorizontal:8,marginVertical:4}}
                            />
                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                clearButtonMode="always"
                                value={lastName}
                                onChangeText={text => setLastName(text)}
                                placeholder="Last Name"
                                textAlign={'center'}
                                style={{ padding: 0,marginHorizontal:8,marginVertical:4}}
                            />                            
                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                clearButtonMode="always"
                                value={ages}
                                onChangeText={text => setAges(text)}
                                placeholder="Ages"
                                textAlign={'center'}
                                style={{ padding: 0,marginHorizontal:8,marginVertical:4}}
                                keyboardType={'number-pad'}
                            />
                            <View style={{borderBottomWidth:1,width:120,borderBottomColor:'#ddd'}}/>
                            
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                
                                <View style={{flexDirection:'row',alignItems:'center',marginTop:16}} >

                                    <Pressable onPress={() => DeleteData()}>
                                        <View style={{marginRight:16,WpaddingTop:4,paddingBottom:4,alignItems:'center',justifyContent:'center'}} >
                                            <Text style={{color:'#FF6347'}}>Delete</Text>
                                        </View>
                                    </Pressable>

                                    <Pressable onPress={() => setEditModalVisible(!editModalVisible)}>
                                        <Text style={{color:'#1256C2'}}>Cancle</Text>
                                    </Pressable>

                                    <Pressable onPress={()=>UpdateData()}>   
                                        <View style={{marginLeft:16,backgroundColor:'#1256C2',paddingTop:4,paddingBottom:4,paddingLeft:8,paddingRight:8,borderRadius:8,alignItems:'center',justifyContent:'center'}} >
                                            <Text style={{color:'#fff'}}>Save</Text>
                                        </View>
                                    </Pressable>

                                </View>
                            </View>

                        </View>
                        </View>
                    </Modal>

                    <Pressable onPress={()=>{setAddModalVisible(!addModalVisible)}} style={MainStyles.addContainer}>
                        <Text style={MainStyles.addIcon}>+</Text>
                    </Pressable>                        
                    
                </View>
            }
        </>
    )
}

export default Home