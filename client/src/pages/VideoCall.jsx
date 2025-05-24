import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const socket = io("https://konya-backend.onrender.com");

const VideoCall = () => {
  const { auth } = useSelector((state) => state.auth);
  const [me, setMe] = useState("");
  const [stream, setStream] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [call, setCall] = useState({});
  const [userToCall, setUserToCall] = useState("");
  const name = auth?.user?.username || "";


  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    // Kamera ve mikrofon erişimi
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((currentStream) => {
      setStream(currentStream);
      if (myVideo.current) {
        myVideo.current.srcObject = currentStream;
      }
    });

    socket.on("me", (id) => setMe(id));

    // Sunucuya kullanıcı adını gönder (join)
    socket.emit("join", name);

    // Arama geldiğinde
    socket.on("call-user", ({ from, name: callerName, signal }) => {
      setCall({ isReceivingCall: true, from, name: callerName, signal });
    });

    socket.on("call-ended", () => {
      handleLeaveCall();
    });
  }, [name]);

  const callUser = () => {
    if (!userToCall) {
      toast.warning("Lütfen aramak istediğiniz kullanıcı adını girin.");
      return;
    }

    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("call-user", {
        userToCallUsername: userToCall,
        signalData: data,
        from: me,
        name,
      });
    });

    peer.on("stream", (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });

    socket.on("call-accepted", (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("answer-call", { signal: data, to: call.from });
    });

    peer.on("stream", (currentStream) => {
      if (userVideo.current) {
        userVideo.current.srcObject = currentStream;
      }
    });

    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  const handleLeaveCall = () => {
    setCallEnded(true);
    connectionRef.current?.destroy();
    window.location.reload(); // Sayfayı sıfırla
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Görüntülü Görüşme</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">Kendi Kameran</h3>
          <video playsInline muted ref={myVideo} autoPlay className="w-full rounded shadow" />
        </div>

        {callAccepted && !callEnded && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Karşı Taraf</h3>
            <video playsInline ref={userVideo} autoPlay className="w-full rounded shadow" />
          </div>
        )}
      </div>

      <div className="space-y-4">
        {!callAccepted && (
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <input
              type="text"
              placeholder="Kullanıcı adı gir (örneğin: mehmet123)"
              value={userToCall}
              onChange={(e) => setUserToCall(e.target.value)}
              className="p-2 border rounded w-full sm:w-auto"
            />
            <button
              onClick={callUser}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Ara
            </button>
          </div>
        )}

        {call.isReceivingCall && !callAccepted && (
          <div className="flex flex-col sm:flex-row gap-2 items-center">
            <p className="text-yellow-600 font-medium">
              {call.name} sizi arıyor...
            </p>
            <button
              onClick={answerCall}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Kabul Et
            </button>
          </div>
        )}

        {callAccepted && !callEnded && (
          <button
            onClick={handleLeaveCall}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Görüşmeyi Bitir
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoCall;
