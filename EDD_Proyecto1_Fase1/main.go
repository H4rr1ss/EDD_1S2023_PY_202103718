package main

import (
	"EDD_1S2023_PY_202103718/db"
	"fmt"
)

func main() {
	inicio := "\n           ********************************\n           *                              *\n           *     BIENVENIDO A GoDrive     *\n           *                              *\n           ********************************"
	opcion := 0
	resp := ""
	salir := false

	fmt.Println(inicio)
	fmt.Println("\n   1.   Iniciar sesion\n   2.   Salir del sistema\n--------------------------\nElija una opcion:")
	fmt.Scanln(&resp)

	if resp != "1" {
		fmt.Print("\nCerrando Aplicación...\n\n")
		return
	}

	for !salir {
		usuario := ""
		pass := ""
		fmt.Println("\nIngresa tu usuario: ")
		fmt.Scanln(&usuario)
		fmt.Println("\nIngresa tu password: ")
		fmt.Scanln(&pass)

		if usuario == "admin" && pass == "admin" {
			opcion = 1
			salir = true
		} else if usuario == "hola" && pass == "hola" {
			opcion = 2
			salir = true
		}

		switch opcion {
		case 1:
			// MENU DE ADMINISTRADOR
			adminMenu()
			break
		case 2:
			// MENU DE ESTUDIANTES
			estudiantesMenu()
			break
		default:
			fmt.Println("\nPOR FAVOR REVISE LOS DATOS.")
		}
	}
}

// -------------------------------------------------------ADMINISTRADOR-------------------------------------------------------
func adminMenu() {
	menu := "\n*** Dashboard Administrador - EDD GoDrive ***\n*      1. Ver Estudiantes Pendientes        *\n*" +
		"      2. Ver Estudiantes del Sistema       *\n*      3. Registrar Nuevo Estudiante 	    *\n*      4. Carga Masiva de Estudiantes	    *\n" +
		"*      5. Cerrar Sesion 	            *\n*********************************************"
	// MINUS PRIVADO, MAYUS PUBLICO

	opcion := 0
	enter := ""
	salir := false

	for !salir {
		fmt.Println(menu)
		fmt.Print("Elige una opcion: ")
		fmt.Scanln(&opcion)

		switch opcion {
		case 1: // VER ESTUDIANTES PENDIENTES
			verEstudiantesPendientes()
			fmt.Println("\n\n    < Presione enter para regresar >")
			fmt.Scanln(&enter)
			break

		case 2: // VER ESTUDIANTES DEL SISTEMA
			db.ListaDeEstudiantesRegistrados()
			fmt.Println("\n\n    < Presione enter para regresar >")
			fmt.Scanln(&enter)
			break

		case 3: // REGISTRAR NUEVO ESTUDIANTE
			registrarNuevoEstudiante()
			fmt.Println("\n\n    < Presione enter para regresar >")
			fmt.Scanln(&enter)
			break

		case 4: // CARGA MASICA DE ESTUDIANTES
			fmt.Println("PENDIENTE")
			fmt.Println("\n\n    < Presione enter para regresar >")
			fmt.Scanln(&enter)
			break

		case 5: // CERRAR SESION
			fmt.Println("\nCerrando Aplicación...")
			salir = true
		}
	}
}

func registrarNuevoEstudiante() {
	var (
		nombre   string
		apellido string
		carnet   string
		pass     string
	)

	fmt.Println("\nIngrese un nombre")
	fmt.Scanln(&nombre)
	fmt.Println("Ingrese un apellido")
	fmt.Scanln(&apellido)
	fmt.Println("Ingrese el carnet")
	fmt.Scanln(&carnet)
	fmt.Println("Ingrese una contraseña")
	fmt.Scanln(&pass)

	if !db.AgregarEstudiante(nombre, apellido, carnet, pass) {
		fmt.Println("\nERROR: Este estudiante ya se encuentra en espera.")
		return
	}

	fmt.Println("\n> Agregado correctamente! ")
}

func verEstudiantesPendientes() {

	salir := false
	opcion := 0

	for !salir {
		if db.ReturnPrimerEstudiante() == "1" {
			return
		}

		fmt.Println("\nElija una opcion:\n 1. Aprobar estudiante\n 2. Rechazar estudiante\n 3. Volver a menú principal\n---------------------------")
		fmt.Scanln(&opcion)

		switch opcion {
		case 1:
			db.AprobarEstudiante()
			fmt.Println("\nEstudiante aprobado.")
			break
		case 2:
			fmt.Println("2")
			break
		case 3:
			fmt.Println("\n Regresando al menú principal...")
			salir = true
			break
		}
	}
}

// -------------------------------------------------------ESTUDIANTE-------------------------------------------------------
func estudiantesMenu() {
	fmt.Println("MENU DE ESTUDIANTES")
}
