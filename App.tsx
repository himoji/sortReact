import { useState } from "react";

import "./App.css";

let initialArray = [5, 1, 3, 6, 4, 2];

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function App() {
  const [boxArray, setBoxArray] = useState(initialArray);
  const [size, setSize] = useState(25);
  const [iterator, setIter] = useState(0);
  const [delay, setDelay] = useState(100);
  const [currentLastBox, setCLastB] = useState(0);
  const [currentMinBox, setCMinB] = useState(0);
  const [selectedSort, setSelectedSort] = useState("selectionSort");

  //let boxArray = [5, 1, 2, 3, 4];

  async function selectionSort(arr: number[], n: number) {
    let j: number, min_i: number;

    for (let i = 0; i < n; i++) {
      min_i = i;
      setCLastB(i);
      for (j = i + 1; j < n; j++) {
        if (arr[j] < arr[min_i]) {
          min_i = j;
          setCMinB(j);
        }
      }
      [arr[min_i], arr[i]] = [arr[i], arr[min_i]];
      setBoxArray(arr);
      setIter(i);

      await sleep(delay);
    }
  }

  async function bubbleSort(arr: number[], n: number) {
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n - i - 1; j++) {
        setCMinB(j + 1); //yellow
        setCLastB(j);
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }

        setBoxArray(arr);
      }
      await sleep(delay);

      setIter(i);
    }
  }

  async function quickSort(arr) {
    if (arr.length <= 1) {
      return arr;
    }

    let pivot = arr[0];
    let leftArr = [];
    let rightArr = [];

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < pivot) {
        leftArr.push(arr[i]);
      } else {
        rightArr.push(arr[i]);
      }
      setCLastB(i);
      setCMinB(pivot);
      setIter(i);
      setBoxArray(arr);
      await sleep(delay);
    }

    return [...quickSort(leftArr), pivot, ...quickSort(rightArr)];
  }

  function verifySort(arr: number[], n: number) {
    for (let i = 0; i < n; i++) {
      if (arr[i] > arr[i + 1]) {
        return false;
      }
    }
    console.log("vrfied");
    return true;
  }

  async function handleClickSort() {
    if (!verifySort(boxArray, boxArray.length))
      switch (selectedSort) {
        case "selectionSort":
          selectionSort(boxArray, boxArray.length);
          break;
        case "bubbleSort":
          console.log("BubbleSort call");
          bubbleSort(boxArray, boxArray.length);
          break;
        case "quickSort":
          console.log("quickSort call");
          quickSort(boxArray);
          break;
        default:
          break;
      }
    selectionSort(boxArray, boxArray.length);
  }

  function handleClickRandom() {
    let randomArray: number[] = [];
    for (let i = 0; i < size; i++) {
      const randomNumber = Math.floor(Math.random() * size) + 1;
      randomArray.push(randomNumber);
    }
    setBoxArray(randomArray);
  }

  function handleChangeSize(e: any) {
    e.preventDefault();
    let iter = e.target.value;
    setSize(iter);
  }

  function handleChangeDelay(e: any) {
    e.preventDefault();
    let iter = e.target.value;
    setDelay(iter);
  }

  function handleSortChange(e: any) {
    e.preventDefault();
    let sSort = e.target.value;
    setSelectedSort(sSort);
  }

  const Box = ({ value, bgColor }: { value: number; bgColor: string }) => {
    let nBoxArray = boxArray.length;
    return (
      <div
        style={{
          backgroundColor: bgColor,
          height: `${value}rem`,
          width: `${56 / nBoxArray}rem`,
          outline: "black solid 0.01rem",
        }}
      ></div>
    );
  };

  return (
    <>
      <div
        style={{
          width: "60rem",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            justifyItems: "center",
            flexFlow: "wrap",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <div
            style={{
              justifyContent: "center",
              display: "flex",
              flexWrap: "wrap-reverse",
              margin: "0 0 0 0",
            }}
          >
            {boxArray.map((value: number, i: number) => {
              switch (i) {
                case currentMinBox:
                  return (
                    <>
                      <Box value={value} bgColor={"#e9c46a"} />
                    </>
                  );
                case currentLastBox:
                  return (
                    <>
                      <Box value={value} bgColor={"#2a9d8f"} />
                    </>
                  );
                default:
                  return (
                    <>
                      <Box value={value} bgColor={"#52796f"} />
                    </>
                  );
              }
            })}
          </div>
          <div>
            <button
              type="button"
              onClick={handleClickSort}
              style={{
                width: "10rem",
                backgroundColor: "#52796f",
                border: "1rem solid #52796f",

                fontSize: "3rem",
                alignSelf: "center",
                marginTop: "1rem",
              }}
            >
              Sort
            </button>
            <button
              type="button"
              onClick={handleClickRandom}
              style={{
                width: "15rem",
                backgroundColor: "#52796f",
                border: "1rem solid #52796f",

                fontSize: "3rem",
                alignSelf: "center",
                marginTop: "1rem",
                marginRight: "1rem",
                marginLeft: "1rem",
              }}
            >
              Random
            </button>

            <select
              onChange={handleSortChange}
              style={{
                width: "25rem",
                backgroundColor: "#52796f",
                border: "1rem solid #52796f",

                fontSize: "3rem",
                alignSelf: "center",
                marginTop: "1rem",
              }}
            >
              <option value="selectionSort">Selection Sort</option>
              <option value="bubbleSort">Bubble Sort</option>
              <option value="quickSort">Quick Sort</option>
            </select>
          </div>
          <h1>Size: {`${size}`}</h1>
          <input
            id="sizeRange"
            type="range"
            onChange={(e) => handleChangeSize(e)}
            style={{
              width: `45rem`,
              backgroundColor: "#52796f",
              border: "1rem solid #52796f",

              fontSize: "3rem",
              alignSelf: "center",
              marginTop: "1rem",
            }}
            min={2}
            max={500}
          />
          <input
            type="input"
            placeholder="Delay in ms (default: 100)"
            onChange={(e) => handleChangeDelay(e)}
            style={{
              width: `35rem`,
              backgroundColor: "#52796f",
              border: "1rem solid #52796f",

              fontSize: "3rem",
              alignSelf: "center",
              marginTop: "1rem",
            }}
          />
          <h1>{`Iteration: ${iterator}`}</h1>
        </div>
      </div>
    </>
  );
}
