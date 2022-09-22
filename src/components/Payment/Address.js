import React,{useState, useRef} from 'react';
import { returnTrue } from 'react-currency-format/lib/utils';
import { useStateValue } from '../StateProvider/StateProvider';
import './Payment.css'

//공부 부족!! 다시 만들어보기!
//서버에 userdata랑 basket이랑 같이 넘겼다가 같은 주문번호일때 받아서 화면에 보이게 하려면 어떻게 해야할지 고민해보기
//stripe API 이용방법 공부하기

function Address() {
    const [{address}, dispatch] = useStateValue();

    // const [data,setData] = useState([]);
    const  [state, setState] = useState({
        Region : "",
        Name : "",
        Phone1: "",
        Phone2: "",
        Phone3: "",
        Add1: "",
        Add2: "",
        Zip: "",
    });

    const NameInput = useRef();
    const Phone1Input = useRef();
    const Phone2Input = useRef();
    const Phone3Input = useRef();
    const Add1Input = useRef();
    const Add2Input = useRef();
    const ZipInput = useRef();

    const handleChangeState = (e)=>{
        setState({
            ...state,
            [e.target.name] : e.target.value,
        });
    };

    // const onCreateAdd = (Region, Name, Phone1, Phone2, Phone3, Add1, Add2, Zip) => {
    //     const newItem = {
    //       Region,
    //       Name,
    //       Phone1, Phone2, Phone3,
    //       Add1, Add2,
    //       Zip,
    //     };
    //     setData([newItem, ...data])
    // };

    // const handleSubmit = ()=>{
    //     onCreateAdd(state.Name, state.Region, state.Phone1, state.Phone2, state.Phone3, state.Add1, state.Add2, state.Zip);
    //     console.log("저장성공");
    // };

    const arrList = [state.Region, state.Name, state.Phone1, state.Phone2, state.Phone3, state.Add1, state.Add2, state.Zip];

    const addToAddress = () => {
        if(!arrList){
            dispatch({
                type: "ADD_TO_ADDRESS",
                address: null
            })
        }else{
            dispatch({
                type: "ADD_TO_ADDRESS",
                address: arrList,
            });
        }
    };

    // console.log("확인", address);

    //
    const [showResults, setShowResults] = React.useState(false)
    const chAddress = () => setShowResults(true)
    const hideAddress =()=> setShowResults(false);

    return(
        <div className='payment_address'>
            <form action="myfile" className='payment_form'>
                Country/Region
                <select name='Region' className="website" onChange={handleChangeState} value={state.Region}>
                    <option value="USA">United States</option>
                    <option value="australia">Australia</option>
                    <option value="canada">Canada</option>
                    <option value="china">China</option>
                    <option value="egypt">Egypt</option>
                    <option value="france">France</option>
                    <option value="germany">Germany</option>
                    <option value="india">India</option>
                    <option value="italy">Italy</option>
                    <option value="japan">Japan</option>
                    <option value="mexico">Mexico</option>
                    <option value="singapor">Singapore</option>
                    <option value="spain">Spain</option>
                    <option value="sweden">Sweden</option>
                    <option value="turkey">Turkey</option>
                    <option value="UAE">United Arab Emirates</option>
                    <option value="UK">United Kingdom</option>
                    <option value="KR">Republic of Korea</option>
                </select>
                Full Name
                <input           
                    type="text"  
                    ref={NameInput}
                    name="Name"
                    value={state.Name} 
                    onChange={handleChangeState} 
                />
                Phone Number
                <div className='telDiv'>
                    <input           
                        type="text"  
                        maxLength={3}
                        ref={Phone1Input}
                        name="Phone1"
                        value={state.Phone1} 
                        onChange={handleChangeState} 
                    />-                
                    <input           
                        type="text" 
                        maxLength={4}
                        ref={Phone2Input}
                        name="Phone2"
                        value={state.Phone2} 
                        onChange={handleChangeState} 
                    />-                
                    <input           
                        type="text"  
                        maxLength={4}
                        ref={Phone3Input}
                        name="Phone3"
                        value={state.Phone3} 
                        onChange={handleChangeState} 
                    />
                </div>
                Address
                <input           
                    type="text" 
                    ref={Add1Input}
                    name="Add1"
                    value={state.Add1} 
                    onChange={handleChangeState} 
                />
                <input           
                    type="text" 
                    ref={Add2Input}
                    name="Add2"
                    value={state.Add2} 
                    onChange={handleChangeState} 
                />
                ZIP Code
                <input           
                    type="text" 
                    ref={ZipInput}
                    name="Zip"
                    value={state.Zip} 
                    onChange={handleChangeState} 
                />
                <button onClick={() => {
                    addToAddress();
                    chAddress();
                }} type="button" >Check your Address</button>
                { showResults ? 
                <div className='save_add'>
                    <p onClick={hideAddress}>Check your Address!</p>
                    <div className='saveadd_div'>
                        <div className='spandiv'>
                            <span>Name</span> 
                            <span>Phone number</span>
                            <span>Address</span>
                        </div>
                        <div className='infodiv'>
                            <p>: {state.Name}</p>
                            <p>: {state.Phone1}-{state.Phone2}-{state.Phone3}</p>
                            <p>: {state.Add1}, {state.Add2}, {state.Region}, {state.Zip}</p>
                        </div>
                    </div>
                </div> : null }
            </form>
        </div>
    )
}

export default Address;