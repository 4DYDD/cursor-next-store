import Home from "@/app/page";
import { render } from "@testing-library/react";

describe("Home Page", () => {
  it("should render the home page", () => {
    const page = render(<Home />);
    expect(page).toMatchSnapshot();
  });
});
