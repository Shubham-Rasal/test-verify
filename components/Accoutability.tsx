"use client";

import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { useRef, useState } from "react";
import { verifySignature } from "thirdweb/auth";
import {
  ConnectButton,
  useActiveAccount,
  useActiveWallet,
  useReadContract,
} from "thirdweb/react";

import { inAppWallet } from "thirdweb/wallets";

export const Accountability = () => {
  const account = useActiveAccount();
  const [sign, setSign] = useState<string>("");
  const [verificationStatus, setVerificationStatus] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const onSign = async () => {
    const res = await account?.signMessage({
      message: message,
    });
    if (!res) {
      alert("No sign generated");
      return;
    }
    setSign(res);
  };

  const onVerify = async () => {
    const verResult = await verifySignature({
      address: account?.address || "",
      message: message,
      signature:
        sign ||
        "0x491125f914127dd207d1e84ec15949c6b5c6f1e47adfb87cca2f7202ad28985c1de0b18ae704a81fa24362fd0fd338ae5c99d352e9658aea4c26887c2fa9523e1c",
      client,
    });
    console.log(verResult);
    setVerificationStatus(verResult);
  };

  if (account) {
    return (
      <div
        style={{
          textAlign: "center",
          minWidth: "500px",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <ConnectButton client={client} chain={chain} />
        <div
          style={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "45%",
            }}
          >
            <textarea
              style={{
                marginBottom: "20px",
                border: "1px solid black",
                borderRadius: "5px",
                padding: "5px",
                width: "100%",
              }}
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button
              style={{
                width: "100px",
                height: "30px",
                marginBottom: "20px",
                padding: "5px",
                marginTop: "20px",
                color: "black",
                backgroundColor: "white",
                border: "1px solid black",
                borderRadius: "5px",
                fontWeight: "bold",
                fontSize: "16px",
              }}
              onClick={onSign}
            >
              Sign
            </button>

            <div style={{ marginTop: "20px" }}>
              <p
                style={{
                  width: "200px",
                  marginTop: "20px",
                  overflowWrap: "break-word",
                }}
              >
                Signature: {sign}
              </p>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "45%",
            }}
          >
            <input
              style={{
                marginBottom: "20px",
                border: "1px solid black",
                borderRadius: "5px",
                padding: "15px",
                width: "100%",
              }}
              type="text"
              placeholder="Put your signature here"
              value={sign}
              onChange={(e) => setSign(e.target.value)}
            />

            <div className="status">
              <p
                style={{
                  marginTop: "20px",
                  textWrap: "wrap",
                }}
              >
                Verification Status:{" "}
                {verificationStatus ? "Verified" : "Not Verified"}
              </p>
            </div>

            <button
              style={{
                width: "100px",
                height: "30px",
                marginBottom: "20px",
                padding: "5px",
                marginTop: "20px",
                color: "black",
                backgroundColor: "white",
                border: "1px solid black",
                borderRadius: "5px",
                fontWeight: "bold",
                fontSize: "16px",
              }}
              onClick={onVerify}
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    );
  }
};
