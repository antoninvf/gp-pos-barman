namespace lampirHammingCode;

public class Alice
{
    public static void Logic()
    {
        Console.Clear();
        Console.WriteLine("Hello Alice.\n");
        
        int randomNumber = new Random().Next(0, 15);
        int randomError = new Random().Next(0, 7);
        string customDivider = "\u2605";

        Console.WriteLine($"Random number: {randomNumber}");
        
        string binary = Convert.ToString(randomNumber, 2).PadLeft(4, '0');
        Console.WriteLine($"Binary: {binary}");
        
        int[] d = binary.Select(x => int.Parse(x.ToString())).ToArray();
        
        // Control bits
        int c1 = (d[0] + d[1] + d[3]) % 2;
        int c2 = (d[0] + d[2] + d[3]) % 2;
        int c3 = (d[1] + d[2] + d[3]) % 2;
        
        Console.WriteLine($"Control bits: {c1}{c2}{c3}");

        Console.WriteLine($"Correct: {binary}{customDivider}{c1}{c2}{c3}");
        
        // combine data bits with control bits
        int[] fullbinary = {d[0], d[1], d[2], d[3], c1, c2, c3};
        
        fullbinary[randomError] = fullbinary[randomError] == 0 ? 1 : 0;
        
        string fullbinaryString = string.Join("", fullbinary);
        string fullbinaryStringWithDivider = fullbinaryString.Insert(4, customDivider);
        
        Console.WriteLine($"Error: {fullbinaryStringWithDivider}");
    }
}