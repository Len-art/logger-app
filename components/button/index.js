import React from 'react'

export default props => (
  <button type={props.type || 'button'} onClick={props.onClick} className="button">
    {props.text}
    {!props.unstyled && (
      <>
        <div className="div1" />
        <div className="div2" />
      </>
    )}
    <style jsx>
      {`
        .button {
          position: relative;
          background-color: ${props.unstyled ? 'transparent' : '#2868dd'};
          margin: 5px;
          padding: 8px 12px;
          border-radius: 5px;
          color: ${props.unstyled ? 'rgba(40, 104, 221, .8)' : 'rgba(255, 255, 255, .8)'};
          font-size: 14px;
          text-transform: uppercase;
          box-shadow: ${props.unstyled ? 'none' : '1px 2px 5px -1px rgba(50, 50, 50, 0.8)'};
          transition: 0.25s;
          overflow: hidden;
          z-index: 1;
        }
        .button:hover {
          color: ${props.unstyled ? 'rgba(17, 50, 110, 1)' : 'rgba(255, 255, 255, 1)'};
          transform: scale(1.03);
          box-shadow: ${props.unstyled ? 'none' : '2px 3px 7px -1px rgba(50, 50, 50, 0.6)'};
        }
        .button:hover .div1 {
          transform: translateX(-120px);
        }
        .button:hover .div2 {
          transform: translateX(120px);
        }

        .div1,
        .div2 {
          height: 100%;
          width: 50%;
          position: absolute;
          top: 0px;
          background-color: #083b99;
          transform: translateX(0px);
          transition: 0.5s;
          z-index: -1;
        }

        .div1 {
          top: 0px;
          right: 50%;
        }

        .div2 {
          top: 0px;
          left: 50%;
        }
      `}
    </style>
  </button>
)
