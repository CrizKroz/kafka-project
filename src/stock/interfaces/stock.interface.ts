export interface IStock {
    data:   Data;
    domain: string;
    trx:    string;
}

export interface Data {
    C_ID_MATERIAL:             number;
    CuentaStokAcanalados:      string;
    C_UBICACION_PLANTA_DESC:   string;
    C_OBSERVACIONES:           string;
    N_PIEZAS:                  number;
    C_CALIDAD:                 string;
    C_NECESIDAD:               string;
    C_DICTAMEN_DESC:           string;
    UTCTime:                   number;
    C_OFA:                     string;
    F_FECHA_PRODUCCION:        string;
    C_CLAVE:                   string;
    C_PRODUCTO_COD:            string;
    C_UBICACION_DEPOSITO:      string;
    C_ID_STOCK:                number;
    Pais:                      string;
    timestamp:                 Date;
    C_LINEA_ANTERIOR:          string;
    C_LINEA_ACTUAL_DESC:       string;
    C_UBICACION_LOTE:          string;
    N_ESPESOR:                 number;
    n_id_ejecucion:            number;
    N_LARGO:                   number;
    C_SOCIEDAD:                string;
    N_BIT_ZONA_DESPACHO:       number;
    C_GRADO:                   string;
    C_COLADA:                  string;
    C_MERCADO_COD:             string;
    C_ESTADO_POR_PRODUCTO:     string;
    C_LINEA_ACTUAL:            string;
    C_RESOLUCION_DESC:         string;
    C_LINEA_PROXIMA:           string;
    C_UBICACION_PLANTA:        string;
    C_ESTRATEGIA:              string;
    C_UBICACION_ZONA:          string;
    C_MATERIAL:                string;
    C_FECHA_ULTIMO_MOVIMIENTO: string;
    N_ANCHO:                   number;
    C_TIPO_MATERIAL:           string;
    C_ESTADO:                  string;
    C_IDRED:                   string;
    N_PESO_NETO:               number;
    C_UBICACION_FILA:          string;
    c_llave:                   number;
}
