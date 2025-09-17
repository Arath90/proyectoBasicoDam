//MyDataTypes.jsx
//! nota 4.1
//* porque const y no let? porque no va a cambiar su valor y let porque si va a cambiar su valor entonces datos como el id que puede ser numero o string
//* y datos como Nombre que no va a cambiar su valor se declaran con const y datos como id que puede cambiar su valor se declaran con let
let IdNombre = 'Ar90w';
IdNombre = 706;

const Nombre = 'Arath';
const Apellidos = 'Cortez Salinas';
let NumControl2 = 1074;
let NumControl = 10174;
const FechaReg = new Date();
let Experiencia = 23; 
let Activo = true;
//se imprime en consola los valores de las variables declaradas utilizando saltos de linea para mejor lectura
console.log("IdNombre: ",IdNombre ,"\nNombre: ",Nombre ,"\nApellidos: ",Apellidos ,"\nNumControl: ",NumControl ,"\nNumControl2: ",NumControl2 ,"\nFechaReg: ",FechaReg ,"\nExperiencia: ",Experiencia ,"\nActivo: ",Activo );
//------
//?Arreglos
let Pasatiempos = ['Basquet', 'beisball', 'gaming', 'programacion'];
Pasatiempos.push('Cine'); //se agrega un nuevo elemento al arreglo
Pasatiempos.push('Musica'); //se agrega un nuevo elemento al arreglo
Pasatiempos.push(90); //se agrega un nuevo elemento al arreglo
Pasatiempos.push(true); //se agrega un nuevo elemento al arreglo
console.log("Pasatiempos: ",Pasatiempos);//se imprime en consola el arreglo
//-----
//?-----------------------------------
//* Arreglos con diferentes tipos de datos
let Libros = [];
    Libros.push(1533);
    Libros.push(true);
    Libros.push("Beowulf");
    console.log("Libros:", Libros);
//-----------------------------------
//SE DECLARA LA FUNCIÓN MyDataTypes LA CUAL DEBE RETORNAR UN FRAGMENTO DE REACT QUE SERVIRA COMO VISTA
function MyDataTypes() {
    
  return (
        <>
            <div>
                <h1>
                    Programa para conocer diferentes Tipos de de Datos
                </h1>
                <h2>
                            Id: {IdNombre},  
                    <br/> 
                            Nombre: {Nombre}, 
                    <br/> 
                            Apellido: {Apellidos}, 
                    <br/> 
                            No. Control 1: {NumControl}, 
                    <br/> x
                            No. Control 2: {NumControl2}, 
                    <br/> 
                            {FechaReg.toString()}, 
                    <br/> 
                            {Experiencia}, 
                    <br/> 
                            {(Activo) ? 'Activo' : 'No Activo'} 
                    <br/>
                    
                            Pasatiempos: {Pasatiempos.join(', ')}
                    <br/>
                    Forma 1 de imprimir arreglos
                            Libros: {Libros.join(', ')}
                    <br/>
                    Libros: {Libros[0]},    
                            {(Libros[1]) ? 'Activo' : 'No Activo'}, 
                            {Libros[2]}        
                </h2>
            </div>
        
        </>
    );
};
export default MyDataTypes;