import React, { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "../stripe.css";
import { saveOrder } from "../api/user";
import useEcomStore from "../store/Ecom-store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
    const token = useEcomStore((state) => state.token)
    const clearCart = useEcomStore((state) => state.clearCart)

    const navigate = useNavigate();

    const stripe = useStripe();
    const elements = useElements();

    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const payload = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
        });

        if (payload.error) {
            setMessage(payload.error.message);
            toast.error(payload.error.message);
        } else if (payload.paymentIntent.status === "succeeded") {
            // Create Order
            try {
                saveOrder(token, payload)
                    .then((res) => {
                        console.log(res);
                        clearCart()
                        toast.success("Payment Success!!!");
                        navigate("/user/history");
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } catch (err) {
                console.log(err)
            }

        } else {
            toast.warning("ชำระเงินไม่สำเร็จ");
        }

        setIsLoading(false);
    };

    const paymentElementOptions = {
        layout: "tabs",
    };

    return (
        <div className="flex justify-center py-10">
            <form className="space-y-6 bg-white shadow-md rounded-md py-5 px-20  w-150" id="payment-form" onSubmit={handleSubmit}>
                <PaymentElement id="payment-element" options={paymentElementOptions} />
                <button
                    className="stripe-button"
                    disabled={isLoading || !stripe || !elements}
                    id="submit"
                >
                    <span id="button-text">
                        {isLoading ? (
                            <div className="spinner" id="spinner"></div>
                        ) : (
                            "Pay now"
                        )}
                    </span>
                </button>
                {/* Show any error or success messages */}
                {message && <div id="payment-message">{message}</div>}
            </form>
        </div>
    );
}