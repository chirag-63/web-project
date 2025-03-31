"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar/navbar";
import { Button } from "@/components/ui/button";
import CardU from "@/components/expert-card.jsx";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Label } from "@/components/ui/label";
import { CardContent, CardHeader, Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import Footer from "@/components/footer/footer";
import { ContactForm } from "./requestSubject";
export default function Experts() {
  const cards = [
    "Operating System",
    "Computer Networks",
    "Computer Architecture",
    "System Design",
    "Algorithms",
    "Network Programming",
    "Compiler Design",
    "Web Technology",
    "Data Structures",
    "Artificial Intelligence",
    "Database Management",
    "Cloud Computing",
    "Machine Learning",
    "OOPS",
    "DBMS",
    "Java",
    "C++",
    "Python",
    "JavaScript",
    "SQL",
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCards, setFilteredCards] = useState(cards);

  useEffect(() => {
    const filtered = cards.filter((card) =>
      card.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCards(filtered);
  }, [searchTerm]);

  return (
    <div>
      <div className="min-h-screen flex flex-col  items-center justify-around mx-5 ">
        {/* Cards Container */}
        <div className="w-[350px] mt-2 flex items-center">
          <Search className=" mr-[-25px] h-[30px] text-gray-500 " />
          <Input
            type="text"
            className="text-center"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for a subject"
          />
        </div>
        <div className="flex flex-wrap justify-center gap-10 min-h-screen">
          {filteredCards.map((subject, index) => (
            <CardU subject={subject} key={index} />
          ))}
        </div>

        {/* "Request a Subject" Feature */}
        {/* <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Can't find your subject?{" "}
            <Link
              href="/request-subject"
              className="font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              <Button variant="link">Request for one</Button>
            </Link>
          </p>
        </div> */}
      </div>
      {/* <div className="border-0 rounded-xl p-3 border-gray-200 dark:border-gray-700 px-10">
        <div className="space-y-8">
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <h3 className="text-2xl font-bold">Leave a Message</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex gap-4 p-2 justifce-center items-center">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter your name" />
                    <Label>Subject</Label>
                    <Input
                      id="email"
                      placeholder="Enter subject expert "
                      type="email"
                    />
                  </div>
                  <div className="flex gap-4 items-center">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Enter your query"
                      className="min-h-[100px]"
                    />
                  </div>
                  <Button>Send message</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div> */}
    <ContactForm />
      <Footer />
    </div>
  );
}
