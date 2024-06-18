import React, { useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import { useToast } from "../../context/ToastContext";
import { useEyeGlassService } from "../../services/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SelectLenses = () => {
  const { setToastMessage } = useToast();
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
  const [lensOptions, setLensOptions] = useState([]);
  const UserInfo = localStorage.getItem("UserInfo");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayModal, setDisplayModal] = useState(false);

  const { fetchLensType, getAllLens, createOrder, createProductGlass, createCart } =
    useEyeGlassService();

  const handleLensSelect = (lens) => {
    let updatedData = { ...originalData, lensData: lens };
    setData(updatedData);
    setSelectedLens(lens);
    if (lens.id === 1 || lens.subOptions === undefined) {
      setStep(2);
    } else if (lens.id === 4) {
      setStep(3); // Chuyển đến bước hiển thị các tùy chọn con cho Non-Prescription
    }
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
        }

        const [lensData, lensTypes] = await Promise.all([
          getAllLens(),
          fetchLensType(),
        ]);

        if (lensData !== null && lensData.data.length > 0 && lensTypes !== null && lensTypes.length > 0) {
          mappingLensTypesWithLensData(lensData.data, lensTypes);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      }
    };

    fetchData();
  }, [productData, id, navigate]);

  const handleChangeValue = (e, key) => {
    let updatedData = { ...data, [key]: e.target.value };
    setData(updatedData);
  };

  const handleSubmit = async () => {
    const canSubmit = validateForm();
    if (!canSubmit) {
      return;
    }

    if (!UserInfo) {
      setDisplayModal(true);
    } else {
      const [responseCreateOrder, responsecreateProductGlass] = await Promise.all([
        createOrder(data),
        createProductGlass(data),
      ]);
      if (
        responseCreateOrder.status &&
        responsecreateProductGlass &&
        responsecreateProductGlass.id
      ) {
        toast.success("Order successful");
        navigate("/order-confirm", {
          state: {
            data,
            orderData: responseCreateOrder,
            productGlassData: responsecreateProductGlass,
            typePayment : "oneItem"
          },
        });
      } else {
        setDisplayModal(false);
        toast.error("Order failed");
      }
    }
  };

  const handleAddToCart = async () => {
    const canSubmit = validateForm();
    if (!canSubmit) {
      return;
    }

    const [responseCreateCart] = await Promise.all([
      createCart(data)
    ]);
    if ( responseCreateCart && responseCreateCart.accountID !== undefined) {
      toast.success("Add to cart successful");
      setTimeout(() => {
        navigate("/");
      }, 1000);
      clearTimeout();
    } else {
      toast.error("Add to cart failed");
    }
  };

  const validateForm = () => {
    const {
      odSphere,
      odCylinder,
      odAxis,
      osSphere,
      osCylinder,
      osAxis,
      pdType,
      addOD,
      addOS,
      address,
    } = data;

    if (
      [
        odSphere,
        odCylinder,
        odAxis,
        osSphere,
        osCylinder,
        osAxis,
        pdType,
        addOD,
        addOS,
      ].some((value) => value < 1)
    ) {
      toast.error("Value must be greater than 0!");
      return false;
    }

    if (!address.trim()) {
      toast.error("Please enter your address!");
      return false;
    }

    return true;
  };

  function mappingLensTypesWithLensData(lensData, lensTypes) {
    // Init lens types data
    let mappingLensTypes = [];
    lensTypes.forEach((item) => {
      if (item.status) {
        mappingLensTypes.push({
          id: item.id,
          title: item.description,
          subOptions: lensData.filter((lens) => lens.lensType.id === item.id && lens.status),
        });
      }
    });

    setLensOptions(mappingLensTypes);
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ToastContainer />
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
            <LensSelection
              lensTypes={lensOptions}
              selectedLens={selectedLens}
              setSelectedLens={setSelectedLens}
              handleLensSelect={handleLensSelect}
              navigate={navigate}
              data={data}
            />
          )}
          {step === 2 && (
            <PrescriptionSelection
              data={data}
              handleChangeValue={handleChangeValue}
              handleSubmit={handleSubmit}
              handleAddToCart={handleAddToCart}
              setStep={setStep}
              displayModal={displayModal}
              setDisplayModal={setDisplayModal}
              UserInfo={UserInfo}
            />
          )}
          {step === 3 && (
            <NonPrescriptionSelection
              lensTypes={lensOptions.find((lens) => lens.id === 4).subOptions}
              selectedLens={selectedLens}
              setSelectedLens={setSelectedLens}
              handleLensSelect={handleLensSelect}
            />
          )}
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-lg w-full flex justify-between items-center">
        <span className="text-lg text-gray-600">
          Subtotal: <del>${data.price + 100}</del>{" "}
          <span className="text-yellow-500">${data.price}</span>
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

const LensSelection = ({
  lensTypes,
  selectedLens,
  setSelectedLens,
  handleLensSelect,
  navigate,
  data,
}) => {
  const [expandedLens, setExpandedLens] = useState(null);

  const handleExpand = (lens) => {
    if (expandedLens && expandedLens.id === lens.id) {
      setExpandedLens(null);
    } else {
      setExpandedLens(lens);
    }
  };

  return (
    <div className="lens-selection">
      <button
        onClick={() => navigate(`/product/${data.id}`)}
        className="text-lg text-gray-600 mb-6"
      >
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
          <div key={lens.id}>
            <div
              className={`p-6 border rounded-lg cursor-pointer transition ${expandedLens && expandedLens.id === lens.id
                ? "bg-yellow-100 border-yellow-500"
                : "border-gray-300 hover:bg-yellow-100"
                }`}
              onClick={() => handleExpand(lens)}
            >
              <h3 className="text-xl font-semibold">{lens.title}</h3>
            </div>
            {expandedLens && expandedLens.id === lens.id &&
              lens.subOptions && (
                <div className="pl-6 mt-4 space-y-4">
                  {lens.subOptions.map((subOption) => (
                    <div
                      key={subOption.id}
                      className={`p-4 border rounded-lg cursor-pointer transition ${selectedLens && selectedLens.id === subOption.id
                        ? "bg-yellow-100 border-yellow-500"
                        : "border-gray-300 hover:bg-yellow-100"
                        }`}
                      onClick={() => {
                        setSelectedLens(subOption);
                        handleLensSelect(subOption);
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="text-lg font-semibold">
                            {subOption.lensName}
                          </h4>
                          <p className="text-gray-600">
                            {subOption.lensDescription}
                          </p>
                        </div>
                        {subOption.lensPrice && (
                          <div className="text-lg font-semibold">
                            ${subOption.lensPrice}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

const NonPrescriptionSelection = ({
  lensTypes,
  selectedLens,
  setSelectedLens,
  handleLensSelect,
}) => {
  return (
    <div className="non-prescription-selection">
      <h2 className="text-2xl font-bold mb-6">Choose a lens color</h2>
      <div className="space-y-6">
        {lensTypes.map((lens) => (
          <div
            key={lens.id}
            className={`p-6 border rounded-lg cursor-pointer transition ${
              selectedLens && selectedLens.id === lens.id
                ? "bg-yellow-100 border-yellow-500"
                : "border-gray-300 hover:bg-yellow-100"
            }`}
            onClick={() => {
              setSelectedLens(lens);
              handleLensSelect(lens);
            }}
          >
            <h3 className="text-xl font-semibold">{lens.title}</h3>
            <p className="text-gray-600">{lens.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const PrescriptionSelection = ({
  data,
  handleChangeValue,
  handleSubmit,
  handleAddToCart,
  setStep,
  displayModal,
  setDisplayModal,
  UserInfo,
}) => {
  return (
    <div className="prescription-selection">
      <button className="text-lg text-gray-600 mb-6" onClick={() => setStep(1)}>
        Back to Lens Selection
      </button>
      <h2 className="text-2xl font-bold mb-6">Enter your prescription</h2>
      <p className="text-lg text-gray-600 mb-6">
        <a href="#" className="underline">
          Learn how to read your prescription
        </a>
      </p>
      <div className="space-y-6">
        <PrescriptionInput
          label="OD (right eye)"
          handleChangeValue={handleChangeValue}
          fields={["odSphere", "odCylinder", "odAxis"]}
        />
        <PrescriptionInput
          label="OS (left eye)"
          handleChangeValue={handleChangeValue}
          fields={["osSphere", "osCylinder", "osAxis"]}
        />
        <PrescriptionInput
          label="ADD (left/right eye)"
          handleChangeValue={handleChangeValue}
          fields={["addOD", "addOS"]}
        />
        <PrescriptionInput
          label="PD"
          handleChangeValue={handleChangeValue}
          fields={["pdType"]}
        />
        <div>
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your address
          </label>
          <input
            onChange={(e) => handleChangeValue(e, "address")}
            type="text"
            name="address"
            id="address"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
      </div>
      <div className="mt-6 flex justify-end">
        {UserInfo && (
          <button
            onClick={handleAddToCart}
            className="bg-yellow-500 text-white p-4 mr-2 rounded-lg shadow-md hover:bg-yellow-600 transition"
          >
            Add to Cart
          </button>
        )}
        <button
          onClick={handleSubmit}
          className="bg-yellow-500 text-white p-4 rounded-lg shadow-md hover:bg-yellow-600 transition"
        >
          Save & Continue
        </button>
        <LoginModal
          toggle={displayModal}
          setDisplayModal={setDisplayModal}
          data={data}
        />
      </div>
    </div>
  );
};

const PrescriptionInput = ({ label, handleChangeValue, fields }) => {
  return (
    <div className="prescription-row grid grid-cols-4 gap-6 items-center">
      <span className="col-span-1 text-lg">{label}</span>
      {fields.map((field) => (
        <input
          key={field}
          type="number"
          onChange={(e) => handleChangeValue(e, field)}
          className="border border-gray-300 p-4 rounded col-span-1"
          placeholder="0.00"
        />
      ))}
    </div>
  );
};

export default SelectLenses;
