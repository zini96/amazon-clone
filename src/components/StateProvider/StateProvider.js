import React, { createContext, useContext, useReducer } from "react";

export const StateContext = createContext(); //context를 생성해서 Statecontext에 담기(data layer 준비)

export const StateProvider = ({reducer, initialState, children})=>( //app을 랩핑해서 data layer를 제공
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
)

export const useStateValue = ()=> useContext(StateContext); //data layer에서부터 정보를 각 컴포넌트에 전달

