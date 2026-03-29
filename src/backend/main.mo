import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";

actor {
  public shared ({ caller }) func greet(name : Text) : async Text {
    "Hello, " # name # "! Welcome to Amma Chethi Vantalu!";
  };
};
