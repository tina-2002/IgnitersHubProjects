import java.io.*;
import java.util.*;
import java.util.stream.Collectors;

public class ApproximateSearch{

    public static int levenshteinDistance(String a, String b) {
        int[][] dp = new int[a.length() + 1][b.length() + 1];

        for (int i = 0; i <= a.length(); i++) {
            for (int j = 0; j <= b.length(); j++) {
                if (i == 0) dp[i][j] = j;
                else if (j == 0) dp[i][j] = i;
                else if (a.charAt(i - 1) == b.charAt(j - 1)) dp[i][j] = dp[i - 1][j - 1];
                else dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], Math.min(dp[i - 1][j], dp[i][j - 1]));
            }
        }
        return dp[a.length()][b.length()];
    }

    public static List<String> findClosestMatches(String input, List<String> words, int k) {
        return words.stream()
                .sorted(Comparator.comparingInt(word -> levenshteinDistance(input, word)))
                .limit(k)
                .collect(Collectors.toList());
    }

    public static List<String> loadWordsFromFile(String filePath) {
        List<String> words = new ArrayList<>();
        try (BufferedReader reader = new BufferedReader(new FileReader(filePath))) {
            String line;
            while ((line = reader.readLine()) != null) {
                words.add(line.trim());
            }
        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());
        }
        return words;
    }

    public static void main(String[] args) {
        List<String> words = loadWordsFromFile("words.txt");
        Scanner scanner = new Scanner(System.in);
        System.out.println("Enter a word (type 'exit' to quit):");

        while (true) {
            System.out.print("Input >> ");
            String input = scanner.nextLine().trim();
            if (input.equalsIgnoreCase("exit")) break;

            List<String> closestMatches = findClosestMatches(input, words, 3);
            System.out.println("Output >> " + String.join(", ", closestMatches));
        }
        scanner.close();
    }
}
