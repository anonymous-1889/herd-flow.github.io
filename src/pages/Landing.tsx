
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Cow, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-farm-green-50 to-farm-brown-50 dark:from-farm-green-900 dark:to-farm-brown-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Cow className="h-8 w-8 text-farm-green-600 dark:text-farm-green-400" />
          <span className="text-2xl font-bold text-farm-green-700 dark:text-farm-green-300">HerdFlow AI</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/login" className="text-farm-green-700 dark:text-farm-green-300 hover:underline">Login</Link>
          <Link to="/signup">
            <Button className="bg-farm-green-600 hover:bg-farm-green-700 dark:bg-farm-green-500 dark:hover:bg-farm-green-600">
              Sign Up
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-farm-green-800 dark:text-farm-green-200 mb-6 leading-tight">
          Smart Livestock Management with AI Technology
        </h1>
        <p className="text-xl md:text-2xl text-farm-brown-600 dark:text-farm-brown-300 mb-10 max-w-3xl">
          Optimize your farm operations, track livestock health, and increase productivity with our intelligent cattle management platform.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Link to="/signup">
            <Button size="lg" className="bg-farm-green-600 hover:bg-farm-green-700 dark:bg-farm-green-500 dark:hover:bg-farm-green-600">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link to="/login">
            <Button size="lg" variant="outline" className="border-farm-green-600 text-farm-green-700 hover:bg-farm-green-50 dark:border-farm-green-400 dark:text-farm-green-300 dark:hover:bg-farm-green-900">
              Login to Dashboard
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white dark:bg-farm-brown-800 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-farm-green-700 dark:text-farm-green-300 mb-12">
            Powerful Features for Modern Farmers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg bg-farm-green-50 dark:bg-farm-green-900">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 bg-farm-green-100 dark:bg-farm-green-800 rounded-full flex items-center justify-center mb-4">
                  <Cow className="h-8 w-8 text-farm-green-600 dark:text-farm-green-400" />
                </div>
                <h3 className="text-xl font-bold text-farm-green-700 dark:text-farm-green-300 mb-2">Comprehensive Cattle Tracking</h3>
                <p className="text-farm-brown-600 dark:text-farm-brown-300">
                  Track each animal's health records, feeding schedules, and productivity metrics in one place.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-farm-green-50 dark:bg-farm-green-900">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 bg-farm-green-100 dark:bg-farm-green-800 rounded-full flex items-center justify-center mb-4">
                  <BarChart3 className="h-8 w-8 text-farm-green-600 dark:text-farm-green-400" />
                </div>
                <h3 className="text-xl font-bold text-farm-green-700 dark:text-farm-green-300 mb-2">Data-Driven Insights</h3>
                <p className="text-farm-brown-600 dark:text-farm-brown-300">
                  Gain valuable insights through advanced analytics and reporting tools designed for livestock management.
                </p>
              </CardContent>
            </Card>
            <Card className="border-0 shadow-lg bg-farm-green-50 dark:bg-farm-green-900">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="h-16 w-16 bg-farm-green-100 dark:bg-farm-green-800 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-farm-green-600 dark:text-farm-green-400" />
                </div>
                <h3 className="text-xl font-bold text-farm-green-700 dark:text-farm-green-300 mb-2">Team Collaboration</h3>
                <p className="text-farm-brown-600 dark:text-farm-brown-300">
                  Collaborate with your team seamlessly with role-based access and shared management tools.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-farm-green-700 dark:text-farm-green-300 mb-6">
          Ready to Transform Your Livestock Management?
        </h2>
        <p className="text-xl text-farm-brown-600 dark:text-farm-brown-300 mb-10 max-w-3xl mx-auto">
          Join thousands of farmers who have improved their operations with HerdFlow AI.
        </p>
        <Link to="/signup">
          <Button size="lg" className="bg-farm-green-600 hover:bg-farm-green-700 dark:bg-farm-green-500 dark:hover:bg-farm-green-600">
            Get Started Today
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-farm-green-800 dark:bg-farm-green-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <Cow className="h-6 w-6" />
              <span className="text-xl font-bold">HerdFlow AI</span>
            </div>
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
              <Link to="/login" className="text-white hover:text-farm-green-200">Login</Link>
              <Link to="/signup" className="text-white hover:text-farm-green-200">Sign Up</Link>
              <a href="#" className="text-white hover:text-farm-green-200">About</a>
              <a href="#" className="text-white hover:text-farm-green-200">Contact</a>
            </div>
          </div>
          <div className="border-t border-farm-green-700 mt-8 pt-8 text-center text-farm-green-200">
            <p>&copy; {new Date().getFullYear()} HerdFlow AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
