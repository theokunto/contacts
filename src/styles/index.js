import { StyleSheet } from "react-native";

export const MainStyles = StyleSheet.create({
  ContainerCenter: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:'#f3f4ed',
  },    
  Container:{
      flex: 1,        
      backgroundColor:'#f3f4ed',
      padding:16
  },
  searchBarContainer:{
    backgroundColor: '#fff',
    marginVertical: 16,
    borderRadius: 8
  },
  text: {
    fontSize: 20,
    color: '#101010',
    marginTop: 60,
    fontWeight: '700'
  },
  listItem: {
    marginTop: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderRadius:8
  },
  coverImage: {
    width: 64,
    height: 64,
    borderRadius: 32
  },
  metaInfo: {
    marginLeft: 16,
    justifyContent:'center'
  },
  title: {
    fontSize: 16,      
    fontWeight:'bold',
    color:'#424642'
  },
  subTitle:{
    fontSize: 12,
    color:'#536162'
  },
  addContainer:{
    width:60,
    height:60,
    borderRadius:30,
    backgroundColor:'#1256C2',
    justifyContent:'center',
    alignItems:'center',
    position:'absolute',
    zIndex:1000,
    bottom:16,
    right:16
  },
  addIcon:{
    fontSize:28,
    color:'#f3f4ed',
    fontWeight:'bold'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },  
  textStyle: {
    color: "#424642",
    fontWeight: "bold",
    textAlign: "center",  
    marginTop:16

  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }


})