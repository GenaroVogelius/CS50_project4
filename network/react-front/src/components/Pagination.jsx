import { useState, useEffect, useContext } from "react";
import { DatosDeContexto } from "../context/TestContext";
import { Link } from "react-router-dom";

function Pagination(props) {
  const [link, setLink] = useState(
    props.link
  );

  useEffect(() => {
    setLink(props.link);
  }, [props.link])

  
  const {
    fromNumberOfPagination,
    setFromNumberOfPagination,
    totalNumberOfPages,
    pages,
    postsDataThird,
  } = useContext(DatosDeContexto);

  
  

  const [numbers, setNumbers] = useState([1, 2, 3])
  const [activeNumber, setActiveNumber] = useState(1)
  const [isBackAvailabe, setIsBackAvailable] = useState(false);
  const [nextOrPreview, setNextOrPreview] = useState(30);

  
  


  function pagination(action, number = null) {

    
    if (action === "backward") {

      if (activeNumber === numbers[0]) {
        setFromNumberOfPagination(fromNumberOfPagination - pages);
        setNumbers([numbers[0] - 3, numbers[1] - 3, [...numbers].pop() - 3]);
        setNextOrPreview(pages);
        setActiveNumber([...numbers].pop() - 3);


      }
      else {
        setFromNumberOfPagination(fromNumberOfPagination - pages);
        setActiveNumber(activeNumber - 1);
        setNextOrPreview(nextOrPreview + pages);
      }

      if (activeNumber - 1 === 1) {
        setIsBackAvailable(false);
      }
        
        
    
    }
    if (action === "forward") {
      setFromNumberOfPagination(fromNumberOfPagination + pages);
      setActiveNumber(activeNumber + 1);
      setNextOrPreview(nextOrPreview - pages);
      setIsBackAvailable(true);

      // se da este if cuando llegaste al tope
      // pones [...numbers].pop() para acceder al ultimo elemento, no pones pop solo porque te modifica el arrray original, al usar el spreed operator lo que haces es hacer una copia de ese array.
      if (activeNumber === [...numbers].pop()) {
        setFromNumberOfPagination(fromNumberOfPagination + nextOrPreview);
        setNumbers([numbers[0] + 3, numbers[1] + 3, [...numbers].pop() + 3]);
        setNextOrPreview(nextOrPreview - pages);
        setActiveNumber(numbers[0] + 3);
      }
    }
    
      if (action === "clickNumber") {
        // se da esta condición cuando vas hacia adelante con los numeros
        if (activeNumber < number) {
          setIsBackAvailable(true);

          // esto significa que sumaste de a 1
          if (activeNumber === number - 1) {
            setFromNumberOfPagination(fromNumberOfPagination + pages);
            setNextOrPreview(nextOrPreview - pages);
          }
          // esto significa que sumaste de a 2, por ej. del 1 te fuiste al 3 directo
          else if (activeNumber === number - 2) {
            setFromNumberOfPagination(fromNumberOfPagination + pages * 2);
            setNextOrPreview(nextOrPreview - pages * 2);
          }
        }

        // entra aca cuando vas hacia atras con los numeros
        else {
          // esto significa que restaste de a 1
          if (activeNumber === number + 1) {
            setFromNumberOfPagination(fromNumberOfPagination - pages);
            setNextOrPreview(nextOrPreview + pages);
          }
          // esto significa que restaste de a 2, por ej. del 3 te fuiste al 1 directo
          else if (activeNumber === number + 2) {
            setFromNumberOfPagination(fromNumberOfPagination - pages * 2);
            setNextOrPreview(nextOrPreview + pages * 2);
          }
        }
        
        
        setActiveNumber(number);
      }

    // after click el usuario es llevado arriba de todo de la pantalla.
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  

    
    return (
      <nav className="m-3 p-2" aria-label="pagination">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${isBackAvailabe ? "" : "disabled"} `}>
            <Link
              to={`${link}`}
              className="page-link"
              onClick={() => pagination("backward")}
            >
              Previous
            </Link>
          </li>
          {/* forEach() doesn't actually return anything por eso usas map*/}
          {/* como aca tenes un if, despues de la flecha va { }, sino iria (), como es logica va el {} */}
          {numbers.map((number) => (
            <li
              className={`page-item ${
                activeNumber === number ? "active " : ""
              } ${
                number === numbers[1]
                  ? fromNumberOfPagination + pages <= totalNumberOfPages ||
                    activeNumber >= number
                    ? ""
                    : "disabled"
                  : number === numbers[2]
                  ? fromNumberOfPagination + pages*2 < totalNumberOfPages ||
                    activeNumber >= number || fromNumberOfPagination + pages < totalNumberOfPages
                    ? ""
                    : "disabled"
                  : ""
              } `}
              aria-current="page"
              key={number}
            >
              {activeNumber === number ? (
                <span className="page-link">{number}</span>
              ) : (
                <Link
                  to={`${link}`}
                  className="page-link"
                  onClick={() => pagination("clickNumber", number)}
                >
                  {number}
                </Link>
              )}
            </li>
          ))}
          <li
            className={`page-item ${
              fromNumberOfPagination + pages < totalNumberOfPages
                ? ""
                : "disabled"
            }`}
          >
            <Link
              to={`${link}`}
              className="page-link"
              onClick={() => pagination("forward")}
            >
              Next
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
            

export default Pagination;
