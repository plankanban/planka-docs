---
sidebar_position: 1
---

# Helm Chart

Thanks to [Chris-Greaves](https://github.com/Chris-Greaves) for the amazing work.

## Basic Usage

1. **Add the Repo and Check Availability**
   ```bash
   helm repo add planka http://plankanban.github.io/planka
   helm search repo planka
   ```

2. **Generate a Secret Key and Install Planka**
   ```bash
   export SECRETKEY=$(openssl rand -hex 64)
   helm install planka planka/planka --set secretkey=$SECRETKEY \
   --set admin_email="demo@demo.demo" \
   --set admin_password="demo" \
   --set admin_name="Demo Demo" \
   --set admin_username="demo"
   ```

   > **Note:** The command `openssl rand -hex 64` generates a random hexadecimal key for Planka. On Windows, you can use Git Bash to run that command.

3. **Access Planka via Port Forwarding**
   ```bash
   kubectl port-forward $POD_NAME 3000:1337
   ```

## Accessing Externally

To access Planka externally, you can use the following configuration:

1. **HTTP Only:**
   ```bash
   helm install planka planka/planka --set secretkey=$SECRETKEY \
   --set admin_email="demo@demo.demo" \
   --set admin_password="demo" \
   --set admin_name="Demo Demo" \
   --set admin_username="demo" \
   --set ingress.enabled=true \
   --set ingress.hosts[0].host=planka.example.dev
   ```

2. **HTTPS:**
   ```bash
   helm install planka planka/planka --set secretkey=$SECRETKEY \
   --set admin_email="demo@demo.demo" \
   --set admin_password="demo" \
   --set admin_name="Demo Demo" \
   --set admin_username="demo" \
   --set ingress.enabled=true \
   --set ingress.hosts[0].host=planka.example.dev \
   --set ingress.tls[0].secretName=planka-tls \
   --set ingress.tls[0].hosts[0]=planka.example.dev
   ```

## Using a `values.yaml` (Recommended)

It is recommended to create a `values.yaml` to simplify future upgrades and configurations.

1. **Create a `values.yaml`**

   Below is an example of a `values.yaml` configuration:

   ```yaml
   secretkey: "<InsertSecretKey>"
   # The admin section needs to be present for new instances of Planka, after the first start you can remove the lines starting with admin_. If you want the admin user to be unchangeable admin_email: has to stay
   # After changing the config you have to run ```helm upgrade  planka . -f values.yaml```

   # Admin user
   admin_email: "demo@demo.demo" # Do not remove if you want to prevent this user from being edited/deleted
   admin_password: "demo"
   admin_name: "Demo Demo"
   admin_username: "demo"
   # Admin user

   ingress:
   enabled: true
   hosts:
      - host: planka.example.dev
         paths:
         - path: /
            pathType: ImplementationSpecific

   # Needed for HTTPS
   tls:
      - secretName: planka-tls # existing TLS secret in k8s
      hosts:
         - planka.example.dev
   ```

2. **Install Planka Using the `values.yaml`**
   ```bash
   helm install planka planka/planka -f values.yaml
   ```

## Access Planka

Once the services are running, browse to **planka.example.dev** and log in as **admin_email** with the password **admin_password**.

## Considerations for Production Hosting

If you plan to host Planka in a production environment, here are some things to consider:

- Create a `values.yaml` with your custom configurations. This makes applying future upgrades easier.
- Generate your `secretkey` once and store it securely (e.g., in a vault or in the `values.yaml`) to ensure consistency during upgrades.
- Specify a password for `postgresql.auth.password` to avoid issues with the PostgreSQL chart generating new passwords, which could lock you out of the data you've already stored. (See [this issue](https://github.com/bitnami/charts/issues/2061)).

For any questions or concerns, feel free to [raise an issue](https://github.com/Chris-Greaves/planka-helm-chart/issues/new).

## Known Issues

The Bitnami PostgreSQL chart has an issue where setting a new password is ignored if the release is deleted and a persistent volume (PV) already exists with the previous password. The warning from Bitnami is as follows:

> **Warning!** Setting a password will be ignored on new installation in the case when previous Posgresql release was deleted through the helm command. In that case, old PVC will have an old password, and setting it through helm won't take effect. Deleting persistent volumes (PVs) will solve the issue. Refer to [issue 2061](https://github.com/bitnami/charts/issues/2061) for more details.

If you want to fully uninstall the chart including the data, follow [these steps](https://github.com/bitnami/charts/blob/main/bitnami/postgresql/README.md#uninstalling-the-chart) from the Bitnami Chart's documentation.
