from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time  # Import the time module

# Set up the WebDriver (e.g., Chrome)
driver = webdriver.Chrome()  # Make sure chromedriver is in your PATH

try:
    # Navigate to the website
    driver.get("https://healseek.vercel.app/en")

    # Wait for the page to load completely
    WebDriverWait(driver, 80).until(
        EC.presence_of_element_located((By.TAG_NAME, "body"))
    )

    # Locate and click the Login button
    login_button = WebDriverWait(driver, 80).until(
        EC.element_to_be_clickable((By.XPATH, '//button[.//span[text()="Login"]]'))
    )
    login_button.click()

    # Wait for the login page to load
    WebDriverWait(driver, 80).until(
        EC.presence_of_element_located((By.TAG_NAME, "form"))
    )

    # Locate the email and password fields
    email_field = driver.find_element(By.ID, "email")
    password_field = driver.find_element(By.ID, "password")

    # Enter credentials
    email_field.send_keys("patient@gmail.com")
    password_field.send_keys("patient")

    # Locate and click the login submit button
    submit_button = driver.find_element(By.XPATH, '//button[@type="submit" and text()="Log in"]')
    submit_button.click()

    # Wait for the next page or action to complete
    WebDriverWait(driver, 80).until(
        EC.presence_of_element_located((By.TAG_NAME, "body"))
    )

    print("Test passed: Login successful!")

    # Wait for 80 seconds before closing the browser
    time.sleep(80)  # Pause for 80 seconds

finally:
    # Close the browser
    driver.quit()