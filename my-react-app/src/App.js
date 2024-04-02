import './App.css';
import './index.css'
import { useCallback, useEffect, useRef, useState } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllow, setNumberAllow] = useState(false)
  const [charAllow, setCharAllow] = useState(false)
  const [password, setPassword] = useState('')

  const passwordRef = useRef(null)


  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'QWERTYUIOPLKJHGFDSAZXCVBNMqwertyuioplkjhgfdsazxcvbnm'
    if (numberAllow) str += '1234567890'
    if (charAllow) str += '~`!@#$%^&*()_+*/.{};:,<>/?|'

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numberAllow, charAllow, setPassword])

  const copyPasswordToClipBoard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)

  }, [password])

  useEffect (()=>{passwordGenerator()}, [length, numberAllow, charAllow, passwordGenerator])

  return(
    <>
      <div className='bg-slate-950 h-screen text-white flex'>
        <div className=' border m-auto bg-slate-500 text-black font-medium rounded-lg'>
          <h1 className=' text-lg my-5 mx-3 underline cursor-pointer'>Password Generator using React js framework</h1>
          <div className=''>
            {/* Password shown window */}
            <input
              type='text'
              value={password}
              placeholder='password'
              readOnly
              className='mx-5 shadow-xl rounded-xl mb-5 bg-black text-white items-center text-center p-2 text-lg selection:bg-slate-700 border-none'
              ref={passwordRef}
            />

            <button
              onClick={copyPasswordToClipBoard}
              className='rounded-xl shadow-lg mb-5 bg-blue-900 text-white items-center text-center p-2 text-lg selection:bg-slate-700 border-none w-20 hover:bg-blue-800 hover:text-xl'
            >Copy</button>

            <div className=' flex mx-3 mb-3'>
              <div className='text-zinc-800 mr-1 items-center text-center'>
              <input
              className=' w-24 items-center mx-1'
                  type='range'
                  min={0}
                  max={100}
                  onChange={(e) => { setLength(e.target.value) }}
                />
                <label className=' ml-1 mr-3'> length: {length}</label>
              </div>
              {/* // checkbox for either numbers are allow or nor */}
              <div className='text-zinc-800 mr-4'>
                <input
                className=''
                  type='checkbox'
                  defaultChecked={numberAllow}
                  id='numberInput'
                  onChange={() => { setNumberAllow((prev) => !prev) }}
                ></input>
                <label htmlFor='numberInput'>Number</label>
              </div>
              {/* // checkbox for eithe special chars are allow or nor */}
              <div>
                <input
                  type='checkbox'
                  defaultChecked={charAllow}
                  id='charInput'
                  onChange={() => { setCharAllow((prev) => !prev) }}
                />
                <label className=' text-zinc-800' htmlFor='charInput'>Character</label>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default App;
