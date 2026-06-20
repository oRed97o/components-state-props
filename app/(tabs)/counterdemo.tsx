import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useCounter } from "./usecounter";

//PROPS
type CounterDisplayProps = {
  count: number;
  onAddStart: () => void;
  onMinusStart: () => void;
  onHoldStop: () => void;
  onReset: () => void;
};

// CHILD COMPONENT
function CounterDisplay({
  count,
  onAddStart,
  onMinusStart,
  onHoldStop,
  onReset,
}: CounterDisplayProps) {
  return (
    <View style={styles.childCard}>
      <Text style={styles.tag}>child component · props</Text>

      <Text style={styles.countNumber}>{count}</Text>

      <TouchableOpacity
        style={styles.addBtn}
        onPressIn={onAddStart}
        onPressOut={onHoldStop}
      >
        <Text style={styles.btnText}>+</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.minusBtn}
        onPressIn={onMinusStart}
        onPressOut={onHoldStop}
      >
        <Text style={styles.btnText}>−</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.resetBtn} onPress={onReset}>
        <Text style={styles.btnText}>reset</Text>
      </TouchableOpacity>
    </View>
  );
}

// PARENT COMPONENT
export default function ParentScreen() {
  const { count, handleReset, startAdd, startMinus, stopHold } = useCounter(100);

  return (
    <View style={styles.parentCard}>
      <Text style={styles.tag}>parent component · state</Text>

      <Text style={styles.stateValue}>{count}</Text>

      <CounterDisplay
        count={count}
        onAddStart={startAdd}
        onMinusStart={startMinus}
        onHoldStop={stopHold}
        onReset={handleReset}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  parentCard: {
    flex: 1,
    maxWidth: 370,
    width: "100%",
    alignSelf: "center",
    marginTop: 40,
    marginBottom: 40,
    padding: 18,
    borderRadius: 16,
    backgroundColor: "#E8E0D0",
    alignItems: "center",
  },
  tag: {
    color: "#5C4A36",
    fontSize: 12,
    letterSpacing: 1,
    marginBottom: 6,
  },
  stateValue: {
    color: "#3F6B4F",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 18,
  },
  childCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 18,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#B79C7E",
  },
  countNumber: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#4E3B2A",
    marginBottom: 14,
  },
  addBtn: {
    width: "100%",
    paddingVertical: 10,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#5B8C5A",
    alignItems: "center",
  },
  minusBtn: {
    width: "100%",
    paddingVertical: 10,
    marginBottom: 8,
    borderRadius: 8,
    backgroundColor: "#8C5B3F",
    alignItems: "center",
  },
  resetBtn: {
    width: "100%",
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#A89A86",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});