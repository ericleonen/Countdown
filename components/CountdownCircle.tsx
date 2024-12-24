import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedProps } from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

type Props = {
    percentage: number,
    interpolatedColors: InterpolatedColors
};

const radius = 130;
const strokeWidth = 20;

const trueRadius = radius + strokeWidth;
const trueDiameter = 2 * trueRadius;
const circumference = 2 * Math.PI * radius;

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function CountdownCircle({ percentage, interpolatedColors }: Props) {
    const animatedProps = useAnimatedProps(() => ({
        strokeDashoffset: circumference * percentage
    }));

    return (
        <View style={styles.container}>
            <Svg 
                style={{ transform: [{ rotate: "-90deg" }] }} 
                height={trueDiameter} 
                width={trueDiameter} 
                viewBox={`0 0 ${trueDiameter} ${trueDiameter}`}
            >
                <Circle
                    cx={trueRadius}
                    cy={trueRadius}
                    r={radius}
                    stroke="black"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeOpacity={0.1}
                />
                <AnimatedCircle
                    cx={trueRadius}
                    cy={trueRadius}
                    r={radius}
                    stroke={interpolatedColors.default}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    fill="none"
                    strokeDasharray={`${circumference} ${circumference}`}
                    animatedProps={animatedProps}
                />
            </Svg>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    }
});