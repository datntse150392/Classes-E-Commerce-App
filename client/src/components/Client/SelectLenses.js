import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import DialogModal from "./DialogModal";

// IMPORT API SERVICES
import { useEyeGlassService } from "../../services/index";

const SelectLenses = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { productData } = location.state || {}; // Access the passed state
  const [step, setStep] = useState(1);
  const [selectedLens, setSelectedLens] = useState(null);
  const [data, setData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [lensTypes, setLensTypes] = useState([]);
  const [lensData, setLensData] = useState(null);

  // Behavior variables
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayModal, setDisplayModal] = useState(false);
  const [displayConfirmModal, setDisplayConfirmModal] = useState(true);
  const [bodyDialog, setBodyDialog] = useState({
    header: "",
    message: "",
    status: "",
  });

  // API variables
  const { fetchLensType, getAllLens, createOrder } = useEyeGlassService();

  const handleLensSelect = (lens) => {
    let updatedData = { ...originalData, lensType: lens.id };
    setData(updatedData);
    setSelectedLens(lens);
    setStep(2);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!productData) {
          navigate("/");
        } else {
          let initialData = {
            ...productData,
            odSphere: 0,
            odCylinder: 0,
            odAxis: 0,
            osSphere: 0,
            osCylinder: 0,
            osAxis: 0,
            pdType: false,
            address: "",
          };
          setData(initialData);
          setOriginalData(initialData);
          setLoading(false);
        }
  
        const [lensData, lensTypes] = await Promise.all([
          getAllLens(),
          fetchLensType()
        ]);
  
        if (lensData !== null && lensData.length > 0) {
          setLensData(lensData);
          setLoading(false);
        }
  
        if (lensTypes !== null && lensTypes.length > 0) {
          setLensTypes(lensTypes);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      }
    };
  
    fetchData();
  }, [productData, id, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  // LOGIC FUNCTIONS ZONE
  const handleChangeValue = (e, key) => {
    let updatedData = { ...data, [key]: e.target.value };
    setData(updatedData);
  };

  const handleSubmit =  async () => {
    const canSubmit = validateForm();

    if (canSubmit === false) {
      return;
    }

    // Check user is logged in, if not login then show dialog
    if (localStorage.getItem("UserInfo") === undefined ||
    localStorage.getItem("UserInfo") === null ||
    localStorage.getItem("UserInfo") === "undefined") {
      setDisplayModal(true);
    } else {
      alert("Your total is: $" + data.price +
        "\n Your prescription is: \n 1. odSphere: " + data.odSphere +
        " \n 2. odCylinder: " + data.odCylinder +
        " \n 3. odAxis: " + data.odAxis + " \n 4. osSphere: " + data.osSphere +
        " \n 5. osCylinder: " + data.osCylinder + " \n 6. osAxis: " + data.osAxis +
        " \n 7. pdType: " + data.pdType + " \n 8. Address: " + data.address);
      const [responseCreateOrder] = await Promise.all([createOrder(data)]);
      if (responseCreateOrder.status !== undefined && responseCreateOrder.status) {
        alert("Order created successfully \n" +
          "Details: \n" +
          "Order code: " + responseCreateOrder.code + "\n" +
          "Order sender address: " + responseCreateOrder.senderAddress + "\n" +
          "Order receiver address: " + responseCreateOrder.receiverAddress + "\n");
        setBodyDialog({
          header: "Payment",
          message: "Payment successfull",
          status: "success",
        });
        navigate("/");
      } else {
        setBodyDialog({
          header: "Payment",
          message: "Payment failed",
          status: "error",
        });
        alert("Payment failed")
        setDisplayModal(false);
        navigate("/");
      }
    }
  }

  function validateForm() {
    let odSphere = data.odSphere;
    let odCylinder = data.odCylinder;
    let odAxis = data.odAxis;
    let osSphere = data.osSphere;
    let osCylinder = data.osCylinder;
    let osAxis = data.osAxis;
    let pdType = data.pdType;
    let address = data.address.trim();
    if (odSphere < 0 || odCylinder < 0 || odAxis < 0 || osSphere < 0 || osCylinder < 0 || osAxis < 0) {
      alert("Invalid data, please check again!");
      return false;
    }

    if (address === undefined || address === null || address === "") {
      alert("Please enter your address!");
      return false;
    }

    return true;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* <div className="bg-yellow-100 text-center p-6">
        <span className="text-lg">
          Up to 35% Off | CODE: MORE4DAD |{" "}
          <a href="#" className="underline">
            Shop now
          </a>{" "}
          |{" "}
          <a href="#" className="underline">
            Terms & Conditions
          </a>
        </span>
      </div> */}
      <div className="flex flex-1 items-start justify-between p-12">
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-full">
            <img
              src="https://img.ebdcdn.com/product/lens/gray/mt6827.jpg?im=Resize,width=800,height=400,aspect=fill;UnsharpMask,sigma=1.0,gain=1.0&q=85"
              alt="Glasses"
              className="w-full h-auto mb-8 object-contain"
            />
            <h3 className="text-3xl font-semibold text-center">{data.name}</h3>
            <p className="text-center text-xl text-gray-600">
              {data.glassTypeText}
            </p>
          </div>
        </div>
        <div className="flex-1 bg-white shadow-lg rounded-lg p-8 mx-6 max-w-full w-full">
          {step === 1 && (
            <div className="lens-selection">
              <button onClick={() => navigate(`/product/${id}`)} className="text-lg text-gray-600 mb-6">
                Back to {data.name}
              </button>
              <h2 className="text-2xl font-bold mb-6">Choose your usage</h2>
              <p className="text-lg text-gray-600 mb-6">
                <a href="#" className="underline">
                  Learn about different lens usages
                </a>
              </p>
              <div className="space-y-6">
                {lensTypes.map((lens) => (
                  <div
                    key={lens.id}
                    className={`p-6 border rounded-lg cursor-pointer transition ${
                      selectedLens && selectedLens.id === lens.id
                        ? "bg-yellow-100 border-yellow-500"
                        : "border-gray-300 hover:bg-yellow-100"
                    }`}
                    onClick={() => handleLensSelect(lens)}
                  >
                    <h3 className="text-xl font-semibold">{lens.description}</h3>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="prescription-selection">
              <button
                className="text-lg text-gray-600 mb-6"
                onClick={() => setStep(1)}
              >
                Back to Lens Selection
              </button>
              <h2 className="text-2xl font-bold mb-6">
                Enter your prescription
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                <a href="#" className="underline">
                  Learn how to read your prescription
                </a>
              </p>
              <div className="space-y-6">
                <div className="prescription-row grid grid-cols-4 gap-6 items-center">
                  <span className="col-span-1 text-lg">OD (right eye)</span>
                  <input
                    type="number"
                    onChange={(e) => handleChangeValue(e, "odSphere")}
                    className="border border-gray-300 p-4 rounded col-span-1"
                    placeholder="0.00"
                  />
                  <input
                    type="number"
                    onChange={(e) => handleChangeValue(e, "odCylinder")}
                    className="border border-gray-300 p-4 rounded col-span-1"
                    placeholder="0.00"
                  />
                  <input
                    type="number"
                    onChange={(e) => handleChangeValue(e, "odAxis")}
                    className="border border-gray-300 p-4 rounded col-span-1"
                    placeholder="0"
                  />
                </div>
                <div className="prescription-row grid grid-cols-4 gap-6 items-center">
                  <span className="col-span-1 text-lg">OS (left eye)</span>
                  <input
                    type="number"
                    onChange={(e) => handleChangeValue(e, "osSphere")}
                    className="border border-gray-300 p-4 rounded col-span-1"
                    placeholder="0.00"
                  />
                  <input
                    type="number"
                    onChange={(e) => handleChangeValue(e, "osCylinder")}
                    className="border border-gray-300 p-4 rounded col-span-1"
                    placeholder="0.00"
                  />
                  <input
                    type="number"
                    onChange={(e) => handleChangeValue(e, "osAxis")}
                    className="border border-gray-300 p-4 rounded col-span-1"
                    placeholder="0"
                  />
                </div>
                <div className="prescription-row grid grid-cols-4 gap-6 items-center">
                  <span className="col-span-1 text-lg">PD</span>
                  <input
                    type="number"
                    className="border border-gray-300 p-4 rounded col-span-1"
                    placeholder="63"
                  />
                  <label className="flex items-center col-span-3 text-lg">
                    <input
                      onChange={(e) => handleChangeValue(e, "pdType")}
                      type="checkbox" className="mr-2" /> 2 PD numbers
                  </label>
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your address
                  </label>
                  <input
                    onChange={(e) => handleChangeValue(e, "address")}
                    type="text"
                    name="address"
                    id="address"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button onClick={() => handleSubmit()} className="bg-yellow-500 text-white p-4 rounded-lg shadow-md hover:bg-yellow-600 transition">
                  Save & Continue
                </button>
                <LoginModal toggle={displayModal} setDisplayModal={setDisplayModal} setBodyDialog={setBodyDialog} data={data}/>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-lg w-full flex justify-between items-center">
        <span className="text-lg text-gray-600">
          Subtotal: <del>${data.price + 100}</del> <span className="text-yellow-500">${data.price}</span>
        </span>
        <span className="text-lg text-gray-600">
          or 4 interest-free payments of $7.00 with{" "}
          <a href="#" className="underline">
            afterpay
          </a>
        </span>
      </div>
    </div>
  );
};

export default SelectLenses;
