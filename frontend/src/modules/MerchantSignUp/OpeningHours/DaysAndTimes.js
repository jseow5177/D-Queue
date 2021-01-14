function generateTextValuePair(text, value) {
  return {
    value: value,
    text: text,
  };
}

const times = [
  generateTextValuePair("12:00am", "12:00am"),
  generateTextValuePair("12:30am", "12:30am"),
  generateTextValuePair("1:00am", "1:00am"),
  generateTextValuePair("1:30am", "1:30am"),
  generateTextValuePair("2:00am", "2:00am"),
  generateTextValuePair("2:30am", "2:30am"),
  generateTextValuePair("3:00am", "3:00am"),
  generateTextValuePair("3:30am", "3:30am"),
  generateTextValuePair("4:00am", "4:00am"),
  generateTextValuePair("4:30am", "4:30am"),
  generateTextValuePair("5:00am", "5:00am"),
  generateTextValuePair("5:30am", "5:30am"),
  generateTextValuePair("6:00am", "6:00am"),
  generateTextValuePair("6:30am", "6:30am"),
  generateTextValuePair("7:00am", "7:00am"),
  generateTextValuePair("7:30am", "7:30am"),
  generateTextValuePair("8:00am", "8:00am"),
  generateTextValuePair("8:30am", "8:30am"),
  generateTextValuePair("9:00am", "9:00am"),
  generateTextValuePair("9:30am", "9:30am"),
  generateTextValuePair("10:00am", "10:00am"),
  generateTextValuePair("10:30am", "10:30am"),
  generateTextValuePair("11:00am", "11:00am"),
  generateTextValuePair("11:30am", "11:30am"),
  generateTextValuePair("12:00pm", "12:00pm"),
  generateTextValuePair("12:30pm", "12:30pm"),
  generateTextValuePair("1:00pm", "1:00pm"),
  generateTextValuePair("1:30pm", "1:30pm"),
  generateTextValuePair("2:00pm", "2:00pm"),
  generateTextValuePair("2:30pm", "2:30pm"),
  generateTextValuePair("3:00pm", "3:00pm"),
  generateTextValuePair("3:30pm", "3:30pm"),
  generateTextValuePair("4:00pm", "4:00pm"),
  generateTextValuePair("4:30pm", "4:30pm"),
  generateTextValuePair("5:00pm", "5:00pm"),
  generateTextValuePair("5:30pm", "5:30pm"),
  generateTextValuePair("6:00pm", "6:00pm"),
  generateTextValuePair("6:30pm", "6:30pm"),
  generateTextValuePair("7:00pm", "7:00pm"),
  generateTextValuePair("7:30pm", "7:30pm"),
  generateTextValuePair("8:00pm", "8:00pm"),
  generateTextValuePair("8:30pm", "8:30pm"),
  generateTextValuePair("9:00am", "9:00am"),
  generateTextValuePair("9:30am", "9:30am"),
  generateTextValuePair("10:00pm", "10:00pm"),
  generateTextValuePair("10:30pm", "10:30pm"),
  generateTextValuePair("11:00pm", "11:00pm"),
  generateTextValuePair("11:30pm", "11:30pm"),
];

const daysArr = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const days = daysArr.map((day, index) => generateTextValuePair(day, index));

export { times, days, daysArr };