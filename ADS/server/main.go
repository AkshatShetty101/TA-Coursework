package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
	mgo "gopkg.in/mgo.v2"
	bson "gopkg.in/mgo.v2/bson"
)

// Book Schema
type Book struct {
	ID          bson.ObjectId `bson:"_id,omitempty" json:"id,omitempty"`
	Name        string        `bson:"name" json:"name"`
	Author      string        `bson:"author" json:"author"`
	Description string        `bson:"desc" json:"desc"`
	ImagePath   string        `bson:"img_path" json:"img_path"`
}

// Global db variables
var db *mgo.Database
var collection string

func main() {

	// Setup up Routes => Handler Functions
	router := mux.NewRouter()
	router.HandleFunc("/add", insertBooks).Methods("PUT")

	// Connect with MongoDB
	session, err := mgo.Dial("localhost")
	defer session.Close()
	if err != nil {
		fmt.Printf("\nmgo: %v\n", err)
	}
	db = session.DB("Angular-Workshop")
	collection = "Books"

	// Starting Serve
	fmt.Println("\nStarting Server => http://localhost:3443")
	handler := cors.Default().Handler(router)
	if err := http.ListenAndServe(":3443", handler); err != nil {
		fmt.Printf("\nmux server: %v\n", err)
	}
}

func insertBooks(w http.ResponseWriter, r *http.Request) {
	fmt.Println("\nAt /add [PUT] endpoint.")
	defer r.Body.Close()
	// Getting Parameters
	var books []Book
	body, err := ioutil.ReadAll(r.Body) // Data as Bytes Stream
	err = json.Unmarshal(body, &books)
	if err != nil {
		fmt.Printf("\njson decode: %v\n", err)
		return
	}
	if len(books) == 0 {
		fmt.Printf("\njson decode: No books passed\n")
		return
	}
	// Inserting into DB
	fmt.Fprint(w, "POST done")
}
