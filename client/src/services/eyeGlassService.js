import axios from "axios";

export const useEyeGlassService = () => {
    const baseUrl = process.env.REACT_APP_API_URL;

    const fetchAllEyeGlass = async () => {
        return axios.get(`${baseUrl}/api/EyeGlass`)
            .then(response => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch(error => {
                return null;
            });
    };

    const fetchEyeGlassById = async (id) => {
        return axios.get(`${baseUrl}/api/EyeGlass/${id}`)
            .then(response => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch(error => {
                return null;
            });
    };

    const fetchAllEyeGlassTypes = async () => {
        return axios.get(`${baseUrl}/api/EyeGlassType`)
            .then(response => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch(error => {
                return null;
            });
    };

    const fetchLensType = async () => {
        return axios.get(`${baseUrl}/api/LensType`)
            .then(response => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch(error => {
                return null;
            });
    };

    const getAllLens = async () => {
        return axios.get(`${baseUrl}/api/Lens?PageSize=1000`)
            .then(response => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch(error => {
                return null;
            });
    };

    const createOrder = async (data) => {
        let UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
        let body = {
            accountID: UserInfo.id,
            status: true,
            receiverAddress: data.address
        }
        return axios.post(`${baseUrl}/api/Order`, body)
            .then(response => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch(error => {
                return null;
            });
    };

    const createOrderDetail = async (data) => {
        let body = {
            orderID: data.orderDetails[0].orderID,
            productGlassID: data.orderDetails[0].productGlassID,
            quantity: 1,
            status: true,
            // productGlassRequest: {
            //     eyeGlassID: data.orderDetails[0].productGlassID,
            //     leftLenID: data.orderDetails[0].productGlassRequest.leftLenID,
            //     rightLenID: data.orderDetails[0].productGlassRequest.rightLenID,
            //     accountID: data.accountID,
            //     sphereOD: data.orderDetails[0].productGlassRequest.sphereOD,
            //     cylinderOD: data.orderDetails[0].productGlassRequest.cylinderOD,
            //     axisOD: data.orderDetails[0].productGlassRequest.axisOD,
            //     sphereOS: data.orderDetails[0].productGlassRequest.sphereOS,
            //     cylinderOS: data.orderDetails[0].productGlassRequest.cylinderOS,
            //     axisOS: data.orderDetails[0].productGlassRequest.axisOS,
            //     addOD: data.orderDetails[0].productGlassRequest.addOD,
            //     addOS: data.orderDetails[0].productGlassRequest.addOS,
            //     pd: data.orderDetails[0].productGlassRequest.pd,
            //     status: true
            // }
        }
        return axios.post(`${baseUrl}/api/OrderDetail`, body)
            .then(response => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch(error => {
                return null;
            }
            );
    };

    const createOrderProduct = async (data) => {
        return axios.post(`${baseUrl}/api/Order/Product`, data)
            .then(response => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch(error => {
                return null;
            });
        return null;
    };

    // Lấy danh sách order của user
    const fetchOrderByAccountID = async (id) => {
        return axios.get(`${baseUrl}/api/Order/account/${id}`)
            .then(response => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch(error => {
                return null;
            });
    };

    // Lấy danh sách tất cả order
    const fetchAllOrder = async () => {
        return axios.get(`${baseUrl}/api/Order?PageSize=1000`)
            .then(response => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch(error => {
                return null;
            });
    };

    // Tạo cart của user || api/Cart
    const createCart = async (data) => {
        let UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
        let body = {
            accountID: UserInfo.id,
            eyeGlassID: data.id,
            leftLenID: data.lensData.id,
            rightLenID: data.lensData.id,
            sphereOD: data.odSphere,
            cylinderOD: data.odCylinder,
            axisOD: data.odAxis,
            sphereOS: data.osSphere,
            cylinderOS: data.osCylinder,
            axisOS: data.osAxis,
            addOD: data.addOD,
            addOS: data.addOS,
            pd: data.pdType
        }
        return axios.post(`${baseUrl}/api/Cart`, body)
            .then(response => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch(error => {
                return null;
            });
    };

    // Lấy danh sách cart của user || /api/Cart/72
    const fetchCartByAccountID = async (id) => {
        return axios.get(`${baseUrl}/api/Cart/${id}`)
            .then(response => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch(error => {
                return null;
            });
    };

    // Delete cart của user || /api/Cart/:accountId/:productId
    const deleteCart = async (accountId, productId) => {
        return axios.delete(`${baseUrl}/api/Cart/${accountId}/${productId}`)
            .then(response => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch(error => {
                return null;
            });
    };

    // Tạo productGlass của user || api/ProductGlass
    const createProductGlass = async (data) => {
        let UserInfo = JSON.parse(localStorage.getItem("UserInfo"));
        const body = {
            id: 0,
            eyeGlassID: data.id,
            leftLenID: 39,
            rightLenID: 39,
            accountID: UserInfo.id,
            sphereOD: data.odSphere,
            cylinderOD: data.odCylinder,
            axisOD: data.odAxis,
            sphereOS: data.osSphere,
            cylinderOS: data.osCylinder,
            axisOS: data.osAxis,
            addOD: data.addOD,
            addOS: data.addOS,
            pd: data.pdType,
            status: true
        }
        return axios.post(`${baseUrl}/api/ProductGlass`, body)
            .then(response => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch(error => {
                return null;
            });
    };

    // /api/Payment/create-payment-url'
    const createPaymentUrl = async (data) => {
        const body = {
            orderId: data.id,
            accountID: data.accountID,
            amount: data.total * 25450
        };
    
        // Get the current page URL to use as the return URL
        const returnUrl = window.location.href;
        return axios.post(`${baseUrl}/api/Payment/create-payment-url`, body, {
            headers: {
                'Return-Url': returnUrl
            }
        })
        .then(response => {
            if (response.data) {
                return response.data;
            } else {
                return null;
            }
        })
        .catch(error => {
            return null;
        });
    };
    
    // Update order || /api/Order
    const updateOrder = async (data) => {
        let body = {
            id: data.id,
            status: true,
            senderAddress: data.senderAddress,
            receiverAddress: data.receiverAddress,
            code: data.code,
            process: 1
        }
        return axios.put(`${baseUrl}/api/Order`, body)
            .then(response => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch(error => {
                return null;
            }
            );
    };

    // delete order || /api/Order/:id
    const deleteOrder = async (id) => {
        return axios.delete(`${baseUrl}/api/Order/${id}`)
            .then(response => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch(error => {
                return null;
            }
            );
    };

    // Update quantity cart
    const updateCart = async (data) => {
        return axios.put(`${baseUrl}/api/Cart/${data.accountID}/${data.productGlassID}?quantity=${data.quantity}`)
            .then(response => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch(error => {
                return null;
            }
            );
    };

    return {
        fetchAllEyeGlass,
        fetchEyeGlassById,
        fetchAllEyeGlassTypes,
        fetchLensType,
        getAllLens,
        createOrder,
        createOrderProduct,
        fetchOrderByAccountID,
        createProductGlass,
        createOrderDetail,
        fetchCartByAccountID,
        createCart,
        deleteCart,
        createPaymentUrl,
        updateOrder,
        deleteOrder,
        updateCart,
        fetchAllOrder
    };
};
