CREATE TABLE deposits (
    id NUMBER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    block_number NUMBER NOT NULL,
    block_timestamp TIMESTAMP WITH TIME ZONE NOT NULL,
    fee NUMBER(18, 8) NOT NULL,
    hash VARCHAR2(66) UNIQUE NOT NULL,
    pubkey VARCHAR2(66) NOT NULL
);
