import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthService, useEyeGlassService } from '../../services';

const LoginModal = ({ toggle, setDisplayModal, setBodyDialog, data }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    // Behavior variables
  const [loading, setLoading] = useState(true);

  // API variables
  const { login, register } = useAuthService();
  const { createOrder } = useEyeGlassService();


    const handleModalToggle = () => {
        const modal = document.getElementById('authentication-modal');
        modal.classList.toggle('hidden');
        if (!modal.classList.contains('hidden')) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    };

    useEffect(() => {
        console.log('Toggle: ', toggle);
        handleModalToggle();
    }, [toggle]);

    const handleLoginFormSubmit = async (e) => {
        e.preventDefault();
        // Perform login logic here
        // Example: navigate to dashboard after successful login
        const response = await login(username, password);
        if (response) {
            localStorage.setItem("UserInfo", JSON.stringify(response));
            setUsername('');
            setPassword('');
            alert("Your total is: $" + data.price +
                "\n Your prescription is: \n 1. odSphere: " + data.odSphere +
                " \n 2. odCylinder: " + data.odCylinder +
                " \n 3. odAxis: " + data.odAxis + " \n 4. osSphere: " + data.osSphere +
                " \n 5. osCylinder: " + data.osCylinder + " \n 6. osAxis: " + data.osAxis +
                " \n 7. pdType: " + data.pdType + " \n 8. address: " + data.address);
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
                navigate(`/`);
            } else {
                setUsername('');
                setPassword('');
                setBodyDialog({
                    header: "Payment",
                    message: "Payment failed",
                    status: "error",
                });
                alert("Payment failed")
                setDisplayModal(false);
                navigate(`/`);
            }
        } else {
            setUsername('');
            setPassword('');
            setBodyDialog({
                header: 'Payment',
                body: 'Payment failed',
                status: 'error',
            });
            alert("Payment failed")
            setDisplayModal(false);
            navigate(`/`);
        }
    };
    
    return (
        <>
            <div
                id="authentication-modal"
                tabIndex="-1"
                aria-hidden="true"
                className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
            >
                <div className="relative p-4 m-auto w-full max-w-lg h-full content-center">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Login to your account
                            </h3>
                            <button
                                type="button"
                                className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="authentication-modal"
                                onClick={() => setDisplayModal(false)}
                            >
                                <svg
                                    className="w-3 h-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="p-4 md:p-5">
                            <form className="space-y-4" onSubmit={handleLoginFormSubmit}>
                                <div>
                                    <label
                                        htmlFor="username"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your username
                                    </label>
                                    <input
                                        onChange={(e) => setUsername(e.target.value)}
                                        type="text"
                                        name="username"
                                        id="username"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your password
                                    </label>
                                    <input
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    Login to your account
                                </button>
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                    Don’t have an account?{' '}
                                    <a
                                        href="#"
                                        className="text-blue-700 hover:underline dark:text-blue-500"
                                    >
                                        Create account
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginModal;
