import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import * as Permissions from  'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';


export default class BookTransactionScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            hasCameraPermissions : null,
            scanned : false,
            scannedData : "",
            buttonState : "normal",
            scannedBookId : '',
            scannedStudentId : ''
        }
    }

    getCameraPermissions = async (id) => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);

        this.setState({
            /*
            status === "granted" is true when user has granted permission
            status === "granted" is false when user has not granted permission
            */
            hasCameraPermissions : status === "granted",
            buttonState : id,
            scanned : false
        })
    }

    handleBarCodeScanned = async({type,data}) => {
        const {buttonState} = this.state;

        if(buttonState === "BookId")
        {
            this.setState({
                scanned : true,
                scannedBookId : data,
                buttonState : "normal"
            })
        }
        else if(buttonState === "StudentId")
        {
            this.setState({
                scanned : true,
                scannedStudentId : data,
                buttonState : "normal"
            })
        }

        
    }

    render()
    {
        const hasCameraPermissions = this.state.hasCameraPermissions;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;

        if(buttonState !== "normal" && hasCameraPermissions){
            return (
                <BarCodeScanner
                onBarCodeScanned = {scanned ? undefined : this.handleBarCodeScanned}
                style = {StyleSheet.absoluteFillObject}
                />
            )
        }
        else if (buttonState === "normal"){
            return(
                <View style = {styles.container}>
                    <View>
                    <Image
                    source = {require('../assets/logo.png')}
                    style  = {styles.image}/>
                    </View>
                    <View style = {styles.inputView}>
                        <TextInput
                        style = {styles.inputBox}
                        placeholder = "Book Id"
                        value = {this.state.scannedBookId}
                        />
                        <TouchableOpacity 
                        style = {styles.scanButton}
                        onPress = {() =>{
                            this.getCameraPermissions("BookId")
                        }} >
                            <Text style = {styles.buttonText}>Scan QR code</Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.inputView}>
                        <TextInput
                        style = {styles.inputBox}
                        placeholder = "Student Id"
                        value = {this.state.scannedStudentId}
                        />
                        <TouchableOpacity 
                        style = {styles.scanButton}
                        onPress = {() =>{
                            this.getCameraPermissions("StudentId")
                        }}>
                            <Text style = {styles.buttonText}>Scan QR code</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
        
    }
};

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent  :"center",
        alignItems : "center"
    },
    scanButton : {
        backgroundColor : "green",
        width : 90
    },
    buttonText : {
        fontSize : 15,
        fontWeight : "bold",
        color : "white",
        textAlign : "center"

    },
    inputView : {
        flexDirection : "row",
        margin : 20
    },
    inputBox : {
        width : 200,
        height : 40, 
        borderWidth : 1.5,
        fontSize : 20
    },
    image : {
        height : 200,
        width : 200
    }
})