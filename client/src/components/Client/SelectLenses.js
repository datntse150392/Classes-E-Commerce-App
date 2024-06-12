import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";

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

  // API variables
  const { fetchLensType, getAllLens } = useEyeGlassService();

  // const lenses = [
  //   {
  //     id: 1,
  //     name: "Single Vision (Distance)",
  //     description: "General use lenses for common prescriptions and seeing things from distance.",
  //   },
  //   {
  //     id: 2,
  //     name: "Bifocal & Progressive",
  //     description: "One pair of glasses corrects vision at near, middle, and far distances.",
  //   },
  //   {
  //     id: 3,
  //     name: "Reading",
  //     description: "Lenses that magnify to assist with reading.",
  //   },
  //   {
  //     id: 4,
  //     name: "Non-Prescription",
  //     description: "Basic lenses with no vision correction.",
  //   },
  // ];

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
          navigate(`/`);
        } else {
          setData(productData);
          setOriginalData(productData);
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

  const handleSubmit = () => {
    // Check user is logged in, if not login then show dialog
    if (localStorage)
    setDisplayModal(true);
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="bg-yellow-100 text-center p-6">
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
      </div>
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
              </div>
              <div className="mt-6 flex justify-end">
                <button onClick={() => handleSubmit()} className="bg-yellow-500 text-white p-4 rounded-lg shadow-md hover:bg-yellow-600 transition">
                  Save & Continue
                </button>
                <LoginModal toggle={displayModal} setDisplayModal={setDisplayModal}/>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-lg w-full flex justify-between items-center">
        <span className="text-lg text-gray-600">
          Subtotal: <del>$39</del> <span className="text-yellow-500">$28</span>
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
