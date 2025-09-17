function MyObjects() {
    //Create Person Object
    const person = {
        nombre: 'Ar90w',
        edad: 23,
        direccion: {
            pais: 'Mexico',
            estado: 'Nayarit',
            ciudad: 'Tepic',
            direccion: 'Circuito Mar de Escocia #60, Valles del Country',
        }
    };
    console.log("JSON Persona:", JSON.stringify(person, null, 2))
    return (
        <>
            <div>
                <h1>
                    Programa de Objectos Literales
                </h1>
                <h2>
                    <code>
                        <pre>
                            {/*JSON.stringify(persona)*/}
                            {JSON.stringify(person, null, 2)}
                        </pre>
                    </code>
                </h2>
            </div>
        </>
    );
};
export default MyObjects;