import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
import numpy as np
import matplotlib.pyplot as plt

updated_csv_file_path = 'Dutch vs Hungarian.csv'
updated_data = pd.read_csv(updated_csv_file_path)

max_position_dutch = updated_data['Dutch Final Qualifying Position'].max() + 1
max_position_hungarian = updated_data['Hungarian Final Qualifying Position'].max() + 1

updated_data['Dutch Final Race Position'] = pd.to_numeric(updated_data['Dutch Final Race Position'], errors='coerce').fillna(max_position_dutch)
updated_data['Hungarian Final Race Position'] = pd.to_numeric(updated_data['Hungarian Final Race Position'], errors='coerce').fillna(max_position_hungarian)

updated_data['Dutch Final Qualifying Position'].fillna(max_position_dutch, inplace=True)
updated_data['Hungarian Final Qualifying Position'].fillna(max_position_hungarian, inplace=True)

X_dutch = updated_data[['Dutch Final Qualifying Position']]
y_dutch = updated_data['Dutch Position Change']

X_hungarian = updated_data[['Hungarian Final Qualifying Position']]
y_hungarian = updated_data['Hungarian Position Change']

X_train_dutch, X_test_dutch, y_train_dutch, y_test_dutch = train_test_split(X_dutch, y_dutch, test_size=0.2, random_state=42)
X_train_hungarian, X_test_hungarian, y_train_hungarian, y_test_hungarian = train_test_split(X_hungarian, y_hungarian, test_size=0.2, random_state=42)

lr_dutch = LinearRegression()
lr_hungarian = LinearRegression()

lr_dutch.fit(X_train_dutch, y_train_dutch)
y_pred_dutch = lr_dutch.predict(X_test_dutch)
mse_dutch = mean_squared_error(y_test_dutch, y_pred_dutch)
variance_dutch = np.var(y_pred_dutch)

lr_hungarian.fit(X_train_hungarian, y_train_hungarian)
y_pred_hungarian = lr_hungarian.predict(X_test_hungarian)
mse_hungarian = mean_squared_error(y_test_hungarian, y_pred_hungarian)
variance_hungarian = np.var(y_pred_hungarian)

plt.figure(figsize=(14, 7))

plt.subplot(1, 2, 1)
plt.scatter(X_test_dutch, y_test_dutch, color='blue', label='Actual Position Change')
plt.plot(X_test_dutch, y_pred_dutch, color='red', label='Predicted Position Change')
plt.title('Dutch Race: Actual vs Predicted Position Change')
plt.xlabel('Final Qualifying Position')
plt.ylabel('Position Change')
plt.legend()

plt.subplot(1, 2, 2)
plt.scatter(X_test_hungarian, y_test_hungarian, color='green', label='Actual Position Change')
plt.plot(X_test_hungarian, y_pred_hungarian, color='orange', label='Predicted Position Change')
plt.title('Hungarian Race: Actual vs Predicted Position Change')
plt.xlabel('Final Qualifying Position')
plt.ylabel('Position Change')
plt.legend()

plt.tight_layout()
plt.show()

(mse_dutch, variance_dutch, mse_hungarian, variance_hungarian)
