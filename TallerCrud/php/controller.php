<?php
include('conection.php');

/// Obtenemos el json enviado
header("Content-Type: application/json");
// build a PHP variable from JSON sent using POST method
$data = json_decode(stripslashes(file_get_contents("php://input")),true);

$action = "";
$action = $data['action'];

switch ($action) {
    case 'send':
        $name = $data['name'];
        $tel = $data['tel'];
        $age = $data['age'];
        $sql = "INSERT INTO usercrud (name,age,tel) VALUES ('$name',$age,$tel);";
        try{
            $conect->query($sql);
            echo "<span class='red-text text-darken-2'> Succes <i class='material-icons'>check</i> </span>";
        } catch (Exception $e) {
            echo 'Excepción capturada: ',  $e->getMessage(), "\n";
        }

        break;
    case 'select':
        $id = $data['id'];
        $sql = "SELECT * FROM usercrud WHERE id=$id;";
        $result = $conect->query($sql);
        try{
            if ($result->num_rows > 0) {
                // output data of each row
                while($row = $result->fetch_assoc()) {
                    $rowInfo = array('id' => $row["id"], 'name' => $row["name"], 'age' => $row["age"],
                    'tel' => $row["tel"] );
                    echo json_encode($rowInfo);
                }
            } else {
                echo "0";
            }
        } catch (Exception $e) {
            echo 'Excepción capturada: ',  $e->getMessage(), "\n";
        } 
        break;
    case 'update':
        $id = $data['id'];
        $name = $data['name'];
        $tel = $data['tel'];
        $age = $data['age'];
        $sql = "UPDATE usercrud SET name = '$name', age = $age, tel = $tel WHERE id = $id;";   
        try{
            if ($conect->query($sql)) {
               echo "<span class='red-text text-darken-2'> Succes Updating <i class='material-icons'>check</i> </span>";

            }else{
                echo "<span class='red-text text-darken-2'> Not Succes Updating <i class='material-icons'>error</i> </span>";
            } 
        } catch (Exception $e) {
            echo 'Excepción capturada: ',  $e->getMessage(), "\n";
        } 
        break;
    case 'selectAll':
        $sql = "SELECT * FROM usercrud;";
        $data = array();
        $result = $conect->query($sql);

        try{
            if ($result->num_rows > 0) {
                while($row = mysqli_fetch_assoc($result)) {

                    $data[] = $row;
                   
                }
                echo json_encode($data);
                
                
            } else {
                echo "0";
            }
        } catch (Exception $e) {
            echo 'Excepción capturada: ',  $e->getMessage(), "\n";
        } 
        break;
    case 'delete':
        $id = $data['id'];
        $sql = "DELETE FROM usercrud WHERE id = $id;";
        try{
            $conect->query($sql);
            echo "Deleted";
        } catch (Exception $e) {
            echo 'Excepción capturada: ',  $e->getMessage(), "\n";
        } 
        
    break;

    case 'countData':
        $sql = "SELECT COUNT(*) AS cant FROM usercrud;";
        $result = $conect->query($sql);
        if ($result->num_rows > 0) {
            // output data of each row
            $row = $result->fetch_assoc();
              
                echo $row["cant"];
            
        } else {
            echo "0";
        }

}


