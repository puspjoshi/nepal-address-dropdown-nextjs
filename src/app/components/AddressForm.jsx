"use client"
import React, {useEffect, useState} from 'react'
import SelectInput from './SelectInput'
import TextInput from './TextInput';
import ButtonInput from './ButtonInput';
import {motion} from "framer-motion";
import { useRouter } from "next/navigation";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

console.log(BASE_URL);

function AddressForm() {

  const router = useRouter();
  
  const [provinces, setProvinces] = useState([]);
  const [cities, setCities] = useState([]);
  const [zones, setZones] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedZone, setSelectedZone] = useState("");
  const [address, setAddress] = useState("");

  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  const [showPopup, setShowPopup] = useState("");

  useEffect(() => {
    const fetchProvinces = async () => {
      try{
        const response = await fetch(`${BASE_URL}address.php?type=provinces`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setProvinces(data);
        } else {
          console.error("Expected array but got:", data);
          setProvinces([]);
        }
      }catch(e){
        console.log("Faile to load provinces", e);
      }
    };
    fetchProvinces();
  },[]);

  useEffect(() => {
    if(!selectedProvince) return;
    const fetchCities = async () => {
      try{
        const response = await fetch(`${BASE_URL}address.php?type=cities&province_id=${selectedProvince}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (Array.isArray(data)) {
          setCities(data);
        } else {
          console.error("Expected array but got:", data);
          setCities([]);
        }
      }catch(e){
        console.log("Faile to load provinces", e);
      }
    };
    fetchCities();
  },[selectedProvince]);

  useEffect(() => {
    if( !selectedCity ) return; 
    const fetchZones = async ()=>{
      try{
        const respone = await fetch(`${BASE_URL}address.php?type=zones&city_id=${selectedCity}`)
        if(!respone.ok){
          throw new Error(`Http error! Status: ${respone.status}`);
        }
        const data = await respone.json();
        if(Array.isArray(data)){
          setZones(data);
        }else{
          console.log("Expected zones array but get: ", data);
          setZones([]);
        }
      }catch(e){
        console.log("Zones could not be fetched ", e);
      }
    };
    fetchZones();
  },[selectedCity])

  const handleSave = async () =>{
    const data = {
      province: selectedProvince,
      city: selectedCity,
      zone: selectedZone,
      address: address
    };

    await fetch(`${BASE_URL}save-address.php`,{
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(data)
    })
      .then(result => result.json())
      .then(response => {
        if(response.status == "success"){
          setPopupMessage("Address data is saved successfully");
          setPopupType("success");
          setShowPopup(true);
          setTimeout(() => {
            setShowPopup(false);
            router.push("/thank-you");
          },3000)
        }else{
          setPopupMessage("Address data is not saved, Please try again");
          setPopupType("error");
          setShowPopup(true);
          setTimeout(()=>{
            setShowPopup(false);
          },3000)
        }
      })
      .catch( error => console.error('Error: ', error));

  };  
  return (
    
    <>
    <div className='w-full'>
        <SelectInput 
          label="Province"
          id= "province"
          name="province"
          value={selectedProvince}
          onChange= { (e) => setSelectedProvince(e.target.value)}
          placeholder="Please select provinces"
          options={provinces}
          class="bg-amber-900"
        />
        <SelectInput 
          label="City"
          id= "city"
          name="city"
          value={selectedCity}
          onChange= { (e) => setSelectedCity(e.target.value)}
          placeholder="Please select city"
          options={cities}
          class="bg-amber-900"
        />
        <SelectInput 
          label="Zone / Area"
          id= "zone"
          name="zone"
          value={selectedZone}
          onChange= { (e) => setSelectedZone(e.target.value)}
          placeholder="Please select Zone"
          options={zones}
          class="bg-amber-900"
        />
        <TextInput 
          label="Address"
          name="address"
          id="address"
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Please enter any other address here" 
        />
        <ButtonInput id="save" name="save" label="Save" onClick={handleSave} />

    </div>

    {showPopup && (
      <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`
            fixed 
            bottom-5 
            right-5  
            text-white 
            px-6 
            py-3 
            rounded-lg 
            shadow-lg
            ${popupType === 'success' ? 'bg-green-600' : 'bg-red-600'}
            `}
        >
          {popupMessage} 
        </motion.div>
    )}
    </>
  )
}

export default AddressForm