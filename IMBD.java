public class IMDBApp {
    public static void main(String[] args) {

         String ActressName = "Anne Hathaway";
         int BirthYear = 1982;
         int Age = 2021 - BirthYear;
         String[] movieTitles = {
                 "The Devil Wears Prada", "The Intern", "The Witches",
                 " The Princess Diaries", "Love & Other Drugs", "Ocean's 8", "One Day"
         };
         float[] movieRatings = {
                 8.5f, 8.8f, 6.0f,
                 7.0f, 8.2f, 9f, 7.5f
         };
         System.out.println(" Actress Name: " + ActressName);
         System.out.println(" Year of Birth: " + BirthYear + "(" + Age + " years old)");

         System.out.println(" Famous Movies : ");
         for (int i = 0; i < movieTitles.length; i++) {
              System.out.println(movieTitles[i] + " - " + getRating(movieRatings[i]));
         }
    }
         static String getRating ( float rating){
              if (rating <= 5.0) {
                   return "bad";
              } else if (rating > 5.0 && rating <= 6.5) {
                   return "average";
              } else if (rating > 6.5 && rating <= 7.0) {
                   return "good";

              } else if (rating > 7.0 && rating <= 8.0) {
                   return "very good";
              } else {
                   return "amazing";
              }
         }
    }