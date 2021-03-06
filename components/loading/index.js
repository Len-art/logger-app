import React from 'react'

export default () => (
  <div className="loadingWrapper">
    <div className="loadingInner">
      <div className="leftBox">
        <div className="f1" />
        <div className="f2" />
        <div className="f3" />
      </div>
      <div className="rightBox" />
    </div>
    <style jsx>
      {`
        .f1,
        .f2,
        .f3 {
          height: 8px;
          width: 80%;
          background-color: #888;
          margin: auto;
          transform: translate(0, 0);
        }

        @keyframes f1Loading {
          0% {
            transform: translate(0, 0);
            opacity: 0;
          }
          15% {
            transform: translate(0, 0);
            opacity: 1;
          }
          30% {
            transform: translate(0, 24px);
            opacity: 1;
          }
          70% {
            transform: translate(364px, 24px);
            opacity: 1;
          }
          85% {
            transform: translate(364px, 0);
            opacity: 1;
          }
          100% {
            transform: translate(364px, 0);
            opacity: 0;
          }
        }

        @keyframes f2Loading {
          0% {
            transform: translate(0, 0);
            opacity: 0;
          }
          15% {
            transform: translate(0, 0);
            opacity: 1;
          }
          30% {
            transform: translate(0, 0);
            opacity: 1;
          }
          70% {
            transform: translate(364px, 0);
            opacity: 1;
          }
          85% {
            transform: translate(364px, 0);
            opacity: 1;
          }
          100% {
            transform: translate(364px, 0);
            opacity: 0;
          }
        }

        @keyframes f3Loading {
          0% {
            transform: translate(0, 0);
            opacity: 0;
          }
          15% {
            transform: translate(0, 0);
            opacity: 1;
          }
          30% {
            transform: translate(0, -24px);
            opacity: 1;
          }
          70% {
            transform: translate(364px, -24px);
            opacity: 1;
          }
          85% {
            transform: translate(364px, 0);
            opacity: 1;
          }
          100% {
            transform: translate(364px, 0);
            opacity: 0;
          }
        }

        .f1 {
          top: 14px;
          animation: f1Loading 4s infinite;
        }
        .f2 {
          top: 42px;
          animation: f2Loading 4s infinite;
        }
        .f3 {
          top: 70px;
          animation: f3Loading 4s infinite;
        }
        .leftBox,
        .rightBox {
          height: 80px;
          width: 80px;
          border-radius: 10px;
          border: 3px solid #ccc;
          position: absolute;
          top: 0;
          bottom: 0;
          margin: auto;
        }
        .leftBox {
          left: 0;
          display: flex;
          flex-direction: column;
        }
        .rightBox {
          right: 0;
        }
        .loadingInner {
          width: 100%;
          height: 100%;
          max-width: 450px;
          max-height: 450px;
          margin: 25px;
          position: relative;
        }
        .loadingWrapper {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #fafafa;
        }
      `}
    </style>
  </div>
)
