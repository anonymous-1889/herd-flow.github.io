
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthLayout } from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate request delay
    setTimeout(() => {
      setIsSubmitted(true);
      toast({
        title: "Reset link sent",
        description: "If an account exists, you'll receive a password reset link.",
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <AuthLayout 
      title="Reset Password" 
      subtitle="Enter your email to receive a password reset link"
    >
      <Card className="border-0 shadow-none">
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4 p-0">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 p-0 pt-4">
              <Button 
                type="submit" 
                className="w-full bg-farm-green-500 hover:bg-farm-green-600" 
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send reset link"}
              </Button>
              <div className="text-center text-sm">
                Remember your password?{" "}
                <Link to="/login" className="text-primary hover:underline">
                  Back to login
                </Link>
              </div>
            </CardFooter>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="text-center">
              <p>Check your email for a link to reset your password.</p>
              <p className="text-sm text-muted-foreground mt-2">
                Didn't receive an email? Check your spam folder or try again.
              </p>
            </div>
            <Button 
              className="w-full" 
              variant="outline" 
              onClick={() => setIsSubmitted(false)}
            >
              Try again
            </Button>
            <div className="text-center text-sm">
              <Link to="/login" className="text-primary hover:underline">
                Back to login
              </Link>
            </div>
          </div>
        )}
      </Card>
    </AuthLayout>
  );
}
