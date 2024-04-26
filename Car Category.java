public class FunctionPractice {
    public static void main(String[] args) {
        getEnergyEfficiency('b');
    }

    static void getEnergyEfficiency(char category) {
        switch (category) {
            case 'A':
            case 'a':
                System.out.println("Very Low Energy consumption");break;
            case 'B':
            case 'b':
                System.out.println("Low Energy Consumption");
                break;
            case 'C':
            case 'c':
                System.out.println("Normal Energy Consumption");
                break;
            case 'D':
            case 'd':
                System.out.println("Above Normal Energy Consumption");
                break;
            case 'E':
            case 'e':
                System.out.println("High Energy Consumption");
                break;
            case 'F':
            case 'f':
                System.out.println("Very High Energy Consumption");
                break;
            case 'G':
            case 'g':
                System.out.println("Extremely High Energy Consumption");
                break;
            default:
                System.out.println("Not defined category");

        }
    }
}