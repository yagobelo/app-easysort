import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from "react-native";

export default function Home() {
  useEffect(() => {
    if (n1 > 1) {
      setPluralName("números");
    } else {
      setPluralName("número");
    }
  });

  const [display, setDisplay] = useState("");
  const [visible, setVisible] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);

  const [nMax, setNMax] = useState(false);

  const [n1, setn1] = useState(1);
  const [n2, setn2] = useState(1);
  const [n3, setn3] = useState(100);

  const [data, setData] = useState("");
  const [hora, setHora] = useState("");

  const [resultado, setResultado] = useState("");
  const resultadoArray: number[] = [];

  const [pluralName, setPluralName] = useState("número");

  const sort = () => {
    Keyboard.dismiss();
    setVisible(true);

    !n3 ? setn3(100) : false;

    const d = new Date().toLocaleString("pt-br");
    setData(d.slice(0, 10));
    setHora(d.slice(11, 19));

    if (n1 < 2) {
      resultadoArray.push(nG1());
      return setResultado(resultadoArray[0].toString());
    } else {
      for (let i = 0; i < n1; i++) {
        let n = nG1();
        if (resultadoArray.includes(n)) {
          n = nG1();
        }
        resultadoArray.push(n);
      }

      translateString(resultadoArray.toString());
    }
  };

  const nG1 = () => {
    return Math.floor(Math.random() * (n3 - n2 + 1)) + n2;
  };

  const translateString = (result: string) => {
    const s1 = result.split(",");
    const s2 = s1.join(" - ");

    return setResultado(s2);
  };

  const Result = (numero: string) => {
    return (
      <View style={styles.containerResult}>
        <Text style={styles.txtResult}>{numero}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Modal visible={visible} transparent={true} animationType="slide">
        <View style={styles.containerShowResult}>
          <View style={styles.containerResultScrenn}>
            <Text
              style={{ fontSize: 25, fontWeight: "bold", marginVertical: 10 }}
            >
              RESULTADO
            </Text>

            <Text style={styles.txtResultScreen}>
              Data do Resultado: {data}
            </Text>
            <Text style={styles.txtResultScreen}>
              Hora do Resultado: {hora}
            </Text>

            {Result(resultado)}

            <TouchableOpacity
              style={styles.btnBack}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.txtBtnBack}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text style={{ fontSize: 50, color: "#fff" }}>EASYSORT</Text>
      <Text style={{ fontSize: 20, color: "#fff", marginBottom: 20 }}>
        Seu Organizador de sorteios fácil
      </Text>

      <View style={styles.configDraw}>
        <Text style={styles.display}>{display}</Text>
        <Text style={styles.txtDraw}>Sortear</Text>
        <View
          style={{
            width: "100%",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            style={styles.btnMoreLess}
            onPress={() => (n1 > 1 ? setn1(n1 - 1) : false)}
          >
            <Text style={styles.txtDraw}>-</Text>
          </TouchableOpacity>

          <Text style={styles.txtDraw}>{n1}</Text>

          <TouchableOpacity
            style={styles.btnMoreLess}
            onPress={() => {
              if (n1 === 50) {
                setDisplay("Máximo de números atingido.");
                setTimeout(() => {
                  setDisplay("");
                }, 5000);
              }
              n1 < 50 ? setn1(n1 + 1) : false;
            }}
          >
            <Text style={styles.txtDraw}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.txtDraw}>{pluralName}</Text>

        <View
          style={{
            width: "100%",
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={styles.txtDraw}>entre</Text>
          <TextInput
            style={styles.inputTxt}
            placeholder="1"
            textAlign="center"
            keyboardType="number-pad"
            onChangeText={(text) => {
              if (parseInt(text) < 0) {
                setDisplay(
                  "Erro no recebimento dos valores para o sorteio.\nVerificar margem de números do sorteio."
                );
                setDisableBtn(true);
              } else {
                setn2(parseInt(text));
                setDisplay("");
                setDisableBtn(false);
              }
              if (!text) {
                setn2(1);
              }
            }}
          />

          <Text style={styles.txtDraw}>e</Text>

          <TextInput
            style={styles.inputTxt}
            placeholder="100"
            textAlign="center"
            keyboardType="number-pad"
            onChangeText={(text) => {
              setDisplay("");
              if (parseInt(text) <= 0 || parseInt(text) === n2) {
                setDisplay(
                  "Erro no recebimento dos valores para o sorteio.\nVerificar margem de números do sorteio."
                );
                setDisableBtn(true);
              } else {
                setn3(parseInt(text));
                setDisableBtn(false);
              }
              if (!text) {
                setn3(100);
              }
            }}
          />
        </View>
        <TouchableOpacity
          style={styles.btnSort}
          onPress={() => sort()}
          disabled={disableBtn}
        >
          <Text style={styles.txtBtnSort}>SORTEAR</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#01161e",
  },
  configDraw: {
    alignItems: "center",
    justifyContent: "center",
    width: "80%",
    borderWidth: 5,
    borderColor: "#fff",
    borderRadius: 25,
    padding: 20,
  },
  txtDraw: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  inputTxt: {
    backgroundColor: "#fff",
    width: 70,
    borderRadius: 20,
    height: 40,
    borderWidth: 3,
    borderColor: "#2a9d8f",
    fontSize: 20,
  },
  btnMoreLess: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  btnSort: {
    width: "70%",
    backgroundColor: "#2a9d8f",
    marginTop: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#fff",
    padding: 10,
  },
  txtBtnSort: {
    fontSize: 20,
    fontWeight: "bold",
  },
  display: {
    fontSize: 15,
    color: "#e63946",
  },
  containerShowResult: {
    flex: 1,
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  containerResultScrenn: {
    flex: 0.5,
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    width: "100%",
    alignItems: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    alignSelf: "center",
  },
  txtResultScreen: {
    fontSize: 20,
    fontWeight: "bold",
    alignSelf: "center",
  },
  containerResult: {
    alignSelf: "center",
    backgroundColor: "#01161e",
    borderRadius: 50,
    width: "90%",
    maxHeight: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 5,
    borderColor: "#2a9d8f",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 10,
  },
  txtResult: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  btnBack: {
    width: "50%",
    backgroundColor: "#2a9d8f",
    marginVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  txtBtnBack: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
