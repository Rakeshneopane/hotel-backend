const express = require("express");
const app = express();
const cors = require("cors");


app.use(cors());
app.use(express.json());



const { initialiseDatabase } = require("./db/dbConnect");

const Hotels = require("./models/hotel.models");

const PORT = 3000;

initialiseDatabase();

app.get("/",(req,res)=>{
    res.send("Hotel API is working!");
})

app.listen(PORT, ()=>{
    console.log("Server running on port:", PORT);
});



// const newHotelData = {
//   name: "New Hotel",
//   category: "Mid-Range",
//   location: "123 Main Street, Frazer Town",
//   rating: 4.0,
//   reviews: [],
//   website: "https://hotel-example.com",
//   phoneNumber: "+1234567890",
//   checkInTime: "2:00 PM",
//   checkOutTime: "12:00 PM",
//   amenities: ["Laundry", "Room Service"],
//   priceRange: "$$$ (31-60)",
//   reservationsNeeded: true,
//   isParkingAvailable: true,
//   isWifiAvailable: true,
//   isPoolAvailable: false,
//   isSpaAvailable: false,
//   isRestaurantAvailable: true,
//   photos: ["https://example.com/hotel-photo1.jpg", "https://example.com/hotel-photo2.jpg"],
// };
// const newHotelData1 = {
//   name: "Lake View",
//   category: "Mid-Range",
//   location: "124 Main Street, Anytown",
//   rating: 3.2,
//   reviews: [],
//   website: "https://lake-view-example.com",
//   phoneNumber: "+1234555890",
//   checkInTime: "2:00 PM",
//   checkOutTime: "12:00 PM",
//   amenities: ["Laundry", "Boating"],
//   priceRange: "$$$ (31-60)",
//   reservationsNeeded: true,
//   isParkingAvailable: false,
//   isWifiAvailable: true,
//   isPoolAvailable: false,
//   isSpaAvailable: false,
//   isRestaurantAvailable: false,
//   photos: ["https://example.com/hotel1-photo1.jpg", "https://example.com/hotel1-photo2.jpg"],
// };
// const newHotelData2 = {
//   name: "Sunset Resort",
//   category: "Resort",
//   location: "12 Main Road, Anytown",
//   rating: 4.0,
//   reviews: [],
//   website: "https://sunset-example.com",
//   phoneNumber: "+1299655890",
//   checkInTime: "2:00 PM",
//   checkOutTime: "11:00 AM",
//   amenities: ["Room Service", "Horse riding", "Boating", "Kids Play Area", "Bar"],
//   priceRange: "$$$$ (61+)",
//   reservationsNeeded: true,
//   isParkingAvailable: true,
//   isWifiAvailable: true,
//   isPoolAvailable: true,
//   isSpaAvailable: true,
//   isRestaurantAvailable: true,
//   photos: ["https://example.com/hotel2-photo1.jpg", "https://example.com/hotel2-photo2.jpg"],
// };
const createHotel = async(newHotelData)=>{
    try {
        const newHotel = new Hotels(newHotelData);
        const saveHotel = await newHotel.save();
        return saveHotel;
        
    } catch (error) {
        console.log("Error while adding the data", error);        
    }   
}
// createHotel(newHotelData);
// createHotel(newHotelData1);
// createHotel(newHotelData2);
app.post("/hotels", async (req,res)=>{
    try {
        const savedHotel = await createHotel(req.body);
        res.status(201).json({message:"Hotel saved successfully.", hotel: savedHotel});
    } catch (error) {
        res.status(500).json({message : "Failed to fetch."})
    }
})

const readAllTheHotels = async() =>{
    try {
        const hotel = await Hotels.find();
        return (hotel);
        
    } catch (error) {
        throw error;
    }
}
// readAllTheHotels();

app.get("/hotels",async (req,res)=>{
    try {
        const hotels = await readAllTheHotels();
        if(hotels.length != 0){
            res.json(hotels);
        }
        else{
            res.status(404).json({error: "Hotel not found"})
        }
    } catch (error) {
        res.status(500).json({error: "Failes to fetch hotels."});
    }
});

const readHotelByName = async(name) =>{
    try {
        const hotel = await Hotels.findOne({name});
        return (hotel);
        
    } catch (error) {
        throw error;
    }
}
// readHotelByName("Lake View");

app.get("/hotels/:hotelName", async (req,res)=>{
    try {
        const hotels = await readHotelByName(req.params.hotelName);
        if(hotels){
            res.json(hotels);
        }
        else{
            res.status(404).json({error: "Hotel not found."})
        } 
    } catch (error) {
         res.status(500).json({error: "Failed to fetch hotels."});
    }
});

const readHotelByParkingSpace = async() =>{
    try {
        const hotel = await Hotels.find({isParkingAvailable: true});
        console.log(hotel);
        
    } catch (error) {
        throw error;
    }
}
// readHotelByParkingSpace();

const readHotelByRestaurantsAvailable = async() =>{
    try {
        const hotel = await Hotels.find({isRestaurantAvailable: true});
        console.log(hotel);
        
    } catch (error) {
        throw error;
    }
}
// readHotelByRestaurantsAvailable();

const readHotelByCategory = async(category) =>{
    try {
        const hotel = await Hotels.find({category});
        return (hotel);
        
    } catch (error) {
        throw error;
    }
}
// readHotelByCategory("Mid-Range");

app.get("/hotels/category/:hotelCategory", async (req,res)=>{
    try {
        const hotels = await readHotelByCategory(req.params.hotelCategory);
        if(hotels){
            res.json(hotels);
        }
        else{
            res.status(404).json({error: "Hotel not found"});
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch hotels"});
    }
})

const readHotelByPriceRange = async(priceRange) =>{
    try {
        const hotel = await Hotels.find({priceRange});
        console.log(hotel);
        
    } catch (error) {
        throw error;
    }
}
// readHotelByPriceRange("$$$$ (61+)");

const readHotelByRating = async(rating) =>{
    try {
        const hotel = await Hotels.find({rating});
        return (hotel);
        
    } catch (error) {
        throw error;
    }
}
// readHotelByRating(4);
app.get("/hotels/rating/:hotelRating", async (req,res)=>{
    try {
        const hotels = await readHotelByRating(req.params.hotelRating);
        if(hotels){
            res.json(hotels);
        }
        else{
            res.status(404).json({error: "Hotel not found"});
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch hotels"});
    }
})


const readHotelByPhoneNumber = async(phoneNumber) =>{
    try {
        const hotel = await Hotels.findOne({phoneNumber});
        return (hotel);
        
    } catch (error) {
        throw error;
    }
}
// readHotelByPhoneNumber("+1299655890");
app.get("/hotels/directory/:phoneNumber", async (req,res)=>{
    try {
        const hotels = await readHotelByPhoneNumber(req.params.phoneNumber);
        if(hotels){
            res.json(hotels);
        }
        else{
            res.status(404).json({error: "Hotel not found"});
        }
    } catch (error) {
        res.status(500).json({error: "Failed to fetch hotels"});
    }
})


const updateHotels = async(hotelId, dataToUpdate)=>{

    try {
        const updatedHotels = await Hotels.findByIdAndUpdate(hotelId, dataToUpdate,{new: true});
        console.log(updatedHotels);
    } catch (error) {
        console.log("Error while updating the data", error)
    }
}

// updateHotels("68d4e5cee7972f08dfa12afb", {checkOutTime: "11 AM" });

const updateHotelsRating = async(hotelName, dataToUpdate)=>{

    try {
        const updatedHotels = await Hotels.findOneAndUpdate({name: hotelName}, dataToUpdate,{new: true});
        console.log(updatedHotels);
    } catch (error) {
        console.log("Error while updating the data", error)
    }
}

// updateHotelsRating("Sunset Resort", { rating : 4.2});

const updateHotelsPhone = async(hotelPhone, dataToUpdate)=>{

    try {
        const updatedHotels = await Hotels.findOneAndUpdate({phoneNumber: hotelPhone}, dataToUpdate,{new: true});
        console.log(updatedHotels);
    } catch (error) {
        console.log("Error while updating the data", error)
    }
}

// updateHotelsPhone("+1299655890", { phoneNumber : "+1997687392"});

const deleteHotelById = async(hotelID)=>{
    try {
        const deletedHotel = await Hotels.findByIdAndDelete(hotelID);
        return deletedHotel;
    } catch (error) {
        throw error;
    }
}
// deleteHotelById("68d4e5cee7972f08dfa12afc");

app.delete("/hotels/:hotelId",async (req,res)=>{
    try {
         const deletedHotels = await deleteHotelById(req.params.hotelId);
         res.status(200).json({message: "Hotel deleted successfully.", hotel: deletedHotels});
    } catch (error) {
        res.status(500).json({error: "Failed to delete movies"});
    }
});

const deleteHotelByPhoneNumber =async(dataToDelete)=>{
    try {
        const deletedHotel = await Hotels.findOneAndDelete(dataToDelete);
        console.log("The hotel deleted successfully", deletedHotel);
    } catch (error) {
        throw error;
    }
}
// deleteHotelByPhoneNumber({phoneNumber: "+1234555890"});