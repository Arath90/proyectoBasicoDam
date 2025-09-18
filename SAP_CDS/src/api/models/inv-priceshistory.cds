// Namespace del archivo
namespace inv;

//Modelado de la entidad
entity priceshistory {


    key ID      :Integer;
    DATE        :DateTime;
    OPEN        :Decimal;
    HIGH        :Decimal;
    LOW         :Decimal;
    CLOSE       :Decimal;
    VOLUME      :Decimal;


};