import React, { useState, useEffect } from "react";
import { View, Text, Button } from "react-native";
import QRCodeScanner from "react-native-qrcode-scanner";
import * as Contacts from "react-native-contacts";
import { parseVCard } from "./constants/parseVCard";
import { getContactsByPhoneNumber } from "./constants/getContactsByPhoneNumber";
import Toast from "react-native-toast-message";

const QrCodeScannerTest = ({ scannedQrCodeData, setselectTabBtn }) => {
  const [scannedData, setScannedData] = useState(null);
  const [reActiveScan, setreActiveScan] = useState(false);

  // useEffect(() => {
  //   if (scannedData) {
  //     saveToAddressBook(scannedData);
  //   }
  // }, [scannedData]);

  // const saveContact = (data) => {
  //   const newContact = {
  //     givenName: data.name,
  //     familyName: "Doe",
  //     phoneNumbers: [
  //       {
  //         label: "mobile",
  //         number: data.tel,
  //       },
  //     ],
  //     emailAddresses: [
  //       {
  //         label: "mobile",
  //         email: data.email,
  //       },
  //     ],
  //     note: "We can write some message accourding event.",
  //     thumbnailPath:
  //       "file:///data/user/0/com.vreliconnect/cache/rn_image_picker_lib_temp_c25dc591-e23d-488b-bc63-f6e080db699a.jpg",
  //   };

  //   Contacts.addContact(newContact)
  //     .then((contact) => {
  //       console.log(contact);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  // const saveToAddressBook = async (data) => {
  //   console.log("--------------", parseVCard(data));
  //   saveContact(parseVCard(data));
  //   let result = await getContactsByPhoneNumber("1234512345");
  //   console.log("---------11-------------", result);
  // };

  const handleScan = (event) => {
    if (event.data) {
      let formatedData = parseVCard(event.data);
      if (formatedData?.name !== "" && formatedData?.name !== undefined) {
        scannedQrCodeData(formatedData);
        setreActiveScan(false);
        setselectTabBtn(3);
      } else {
        setreActiveScan(true);
        Toast.show({ text1: "Invalid Qr Code..!" });
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {!scannedData ? (
        <QRCodeScanner
          onRead={handleScan}
          containerStyle={{ flex: 1 }}
          showMarker={true}
          reactivate={reActiveScan}
          reactivateTimeout={2000}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Scanned Data:</Text>
          <Text>{scannedData}</Text>
          <Button title="Scan Again" onPress={() => setScannedData(null)} />
        </View>
      )}
    </View>
  );
};

export default QrCodeScannerTest;
