/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 *
 * @author Al Fayez
 */
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

import java.awt.*;
import java.awt.event.*;
import javax.swing.*;
import java.net.*;
import java.io.*;
import java.util.Arrays;
/**
 *
 * @author jtalim
 */
public class login extends JFrame{

    JTextField login, studentID, classes;
    JLabel promptText;
    JComboBox program, pattern;
      //String[] Allclasses;
   String Allclasses;

    public login(){
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setTitle("Course Selector");

        JPanel panel = new JPanel();
        panel.setLayout(new GridBagLayout());
        GridBagConstraints c = new GridBagConstraints();
        c.fill = GridBagConstraints.HORIZONTAL;
        c.ipadx = 200;

        /* first row*/
        c.gridx=0;
        c.gridy=0;
        panel.add(new JLabel("Login"), c);

        login = new JTextField();
        c.gridx = 1;
        c.gridy = 0;
        panel.add(login, c);


        /*second row*/
        c.gridx=0;
        c.gridy=1;
        panel.add(new JLabel("Student ID"), c);

        studentID = new JTextField();
        c.gridx = 1;
        c.gridy = 1;
        panel.add(studentID, c);


        /* third column*/
        c.gridx=0;
        c.gridy=2;
        panel.add(new JLabel("Program"), c);

        String[] progs = {"CE", "CSE", "SE", "EE"};
        program = new JComboBox(progs);

        c.gridx = 1;
        c.gridy = 2;
        panel.add(program, c);

        /*4th column*/
        c.gridx=0;
        c.gridy=3;
        panel.add(new JLabel("Pattern"), c);

        String[] pattern_sel = {"ON", "OFF"};
        pattern = new JComboBox(pattern_sel);

        c.gridx = 1;
        c.gridy = 3;
        panel.add(pattern, c);

        //classes input panel
        c.gridx=0;
        c.gridy=4;
        promptText = new JLabel("Enter Classes you have taken separted by a comma");
        panel.add(promptText, c);

        classes = new JTextField();
        c.gridx = 1;
        c.gridy = 4;
        panel.add(classes, c);


        /*4th row*/

        c.gridx=0;
        c.gridy=5;
        c.gridwidth=2;
        JButton button =new JButton("Send it to server");

	//String[] Allclasses = {};



        button.addActionListener( new ActionListener(){
            //public String[] Allclasses;
            public void actionPerformed(ActionEvent e){
                /*Every time the button is presed
                 this sequence of code is executed
                 */

                /* Inputs from the user */
                String _login = login.getText();
                String _stID = studentID.getText();
                String _prog = String.valueOf(program.getSelectedItem());
                String _classes = classes.getText();
                //String[] Allclasses;

                //String Allclasses;
                //if(pattern.getSelectedItem()== false){}

                if (_prog.equals("CE")){
                         Allclasses ="sysc,gaga,CE";//list of all CE classes
                }
                if (_prog.equals("CSE")){
                      Allclasses ="sysc,gaga,CSE";//list of all CSE classes
                }
                if (_prog.equals("SE")){
                      Allclasses ="sysc,gaga,SE";//list of all SE classes
                }
                if (_prog.equals("EE")){
                     Allclasses ="sysc,gaga,EE";//list of all EE classes
                }


                String[] classesArray = _classes.split(",");
                String[] AllclassesArray = Allclasses.split(",");
                System.out.println(Arrays.toString(classesArray));
                  System.out.println(Arrays.toString(AllclassesArray));
                int size = classesArray.length;
                System.out.println(size);
                //connvert _classes to array

                int C = 0;
       for (int i = 0; i< size; i++){
           for (int j = 0; j< AllclassesArray.length; j++) {
               //System.out.println("we enter 2nd for"); test case
          	if( classesArray[i].equals(AllclassesArray[j])) {

                    C++;
                     System.out.println("c is increasing");
           }

          }


      }
       System.out.println("C = "+C);
       System.out.println("list of classes enetred "+classesArray[0]);
      // System.out.println(Allclasses[2]);
       if (C == size){

      	System.out.println("VALID COURSES!!!");
      } else {

      	System.out.println("INVALID COURSES!!!\n please re-enter classes");

      	return;
      }


                try{
                    String php = "http://localhost/servlets/process.php?";
                    //String jsp = "http://localhost:8080/index.jsp?";

                    String parameters = "login="
                            +_login+"&studentID="+_stID+"&program="+_prog+"&classes="+_classes;




                     // GET method
                    URL url = new URL(php+ parameters);





                    BufferedReader in = new BufferedReader(
                            new InputStreamReader(url.openStream()) );

                    String text;
                    while ( ( text = in.readLine()  )!=null ) {
                        System.out.print(text);
                    }




                   /*
                    URL urlpost = new URL(jsp);
                    URLConnection connection = urlpost.openConnection();

                    connection.setDoOutput(true);
                    OutputStreamWriter out = new OutputStreamWriter(
                            connection.getOutputStream());
                    out.write(parameters);
                    out.flush();
                    /* This sends the parameters to the server*/

                    /*
                    BufferedReader in = new BufferedReader(
                            new InputStreamReader(connection.getInputStream()));
                    */

                    /*String text;
                    while ( (text = in.readLine()) !=null ){
                        System.out.print(text);
                    }*/
                }catch(Exception ex){}
            }
        });


        panel.add(button, c);



        getContentPane().add(panel, BorderLayout.CENTER);
        pack();
        //classes.setVisible(false);// dont show class input when starting
        //promptText.setVisible(false);
        setVisible(true);
    }

    private static void createAndShowGUI() {
        //Create and set up the window.
        JFrame frame = new login();


    }

    public static void main(String[] args) {
        //Schedule a job for the event-dispatching thread:
        //creating and showing this application's GUI.
        javax.swing.SwingUtilities.invokeLater(new Runnable() {
            public void run() {
                createAndShowGUI();
            }
        });
    }
